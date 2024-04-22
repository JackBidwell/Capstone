import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import axios from 'axios';

export function Attendance() {
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data: courses } = await axios.get('http://localhost:3000/courses.json');


        const { data: enrollments } = await axios.get('http://localhost:3000/course_enrollments.json');


        const enrollmentCounts = enrollments.reduce((acc, { status, course }) => {
          if (status === 'active') {
            acc[course] = (acc[course] || 0) + 1;
          }
          return acc;
        }, {});


        const combinedData = courses.map(({ name, capacity }) => ({
          name,
          uv: enrollmentCounts[name] || 0,
          pv: capacity,
          amt: capacity
        }));

        setCourseData(combinedData);
      } catch (error) {
        setError(error.message);
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <LineChart width={500} height={300} data={courseData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
        <XAxis dataKey="name" label={{ value: "Courses", position: 'insideBottom', offset: -10 }} />
        <YAxis label={{ value: "Enrollment", angle: -90, position: 'insideLeft' }} />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
