import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import moment from 'moment';

export function Attendance() {
  const [courseData, setCourseData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const handlePrev = () => {
    setCurrentIndex(Math.max(0, currentIndex - 3));
  };

  const handleNext = () => {
    setCurrentIndex(Math.min(courseData.length - 3, currentIndex + 3));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  const displayedData = courseData.slice(currentIndex, currentIndex + 3);

  return (
    <div className="container">
      <div className="row">
        {displayedData.map((entry, index) => (
          <div key={index} className="col-md-12">
            <h3 className='title'>{entry.date}</h3>
            <BarChart width={1000} height={500} data={entry.courses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="" label={{ position: 'top' }} />
            </BarChart>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button onClick={handlePrev} disabled={currentIndex === 0} style={{ border: 'none', background: 'none', fontSize: '24px', marginRight: '20px' }}>&larr;</button>
        <button onClick={handleNext} disabled={currentIndex >= courseData.length - 3} style={{ border: 'none', background: 'none', fontSize: '24px' }}>&rarr;</button>
      </div>
    </div>
  );
}

export default Attendance;
