import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import moment from 'moment';

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
          const { status, course, date } = enrollment;
          if (status === 'active') {
            const courseTitle = course;
            const formattedDate = moment(date).format('YYYY-MM-DD');
            acc[courseTitle] = acc[courseTitle] || [];
            acc[courseTitle].push({ date: formattedDate, count: (acc[courseTitle][formattedDate] || 0) + 1 });
          }
          return acc;
        }, {});

        const combinedData = courses.map(course => ({
          name: course.title,
          data: enrollmentCounts[course.title] || []
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
            <h3 className='graph-title'>{course.name}</h3>
            <LineChart width={400} height={300} data={course.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Attendance;
