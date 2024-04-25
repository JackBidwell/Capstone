import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import './Attendance.css';

export function Attendance() {
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: courses } = await axios.get('http://localhost:3000/courses.json');
        const { data: enrollments } = await axios.get('http://localhost:3000/course_enrollments.json');


        const enrollmentCounts = enrollments.reduce((acc, enrollment) => {
          const { status, course } = enrollment;
          if (status === 'active') {
            const courseTitle = course;
            acc[courseTitle] = (acc[courseTitle] || 0) + 1;
          }
          return acc;
        }, {});

        const combinedData = courses.map(course => ({
          name: course.title,
          data: [{
            CurrentEnrollment: enrollmentCounts[course.title] || 0,
            Capacity: course.capacity
          }]
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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container bg-white mt-4">
      <div className="row">
        {courseData.map((course, index) => (
          <div key={index} className="col-md-6 col-lg-4">
            <h3 className='graph-title'>{course.name} </h3>
            <LineChart width={400} height={300} data={course.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="CurrentEnrollment" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Attendance;
