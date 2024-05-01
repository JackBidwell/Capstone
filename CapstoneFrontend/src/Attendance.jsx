import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
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
            acc[formattedDate] = acc[formattedDate] || [];
            acc[formattedDate].push({ name: courseTitle, count: (acc[formattedDate].find(item => item.name === courseTitle)?.count || 0) + 1 });
          }
          return acc;
        }, {});

        const combinedData = Object.keys(enrollmentCounts).map(date => ({
          date,
          courses: enrollmentCounts[date]
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
        {courseData.map((entry, index) => (
          <div key={index} className="col-md-12">
            <h3 className='container'>{entry.date}</h3>
            <BarChart width={1000} height={300} data={entry.courses} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" label={{ position: 'top' }} />
            </BarChart>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Attendance;
