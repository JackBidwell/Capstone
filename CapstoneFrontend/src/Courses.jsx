import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

export function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const jwt = localStorage.getItem('jwt');
        const response = await axios.get('http://localhost:3000/courses.json', {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleEnrollment = async (courseId) => {
    const userId = localStorage.getItem('user_id');
    const jwt = localStorage.getItem('jwt');
    if (!userId || !jwt) {
      alert('You must be logged in to enroll in a course.');
      return;
    }
    try {
      await axios.post('http://localhost:3000/course_enrollments.json', {
        user_id: userId,
        course_id: courseId
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`
        }
      });
      alert('Enrollment successful!');
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('Failed to enroll in course.');
    }
  };

  return (
    <div className="container mt-3">
      <h2 className="mb-3">Courses List</h2>
      {courses.length > 0 ? (
        <div className="list-group">
          {courses.map(course => (
            <div key={course.id} className="list-group-item list-group-item-action flex-column align-items-start">
              <h3 className="mb-1">{course.title}</h3>
              <p className="mb-2">{course.description}</p>
              <p className="mb-1">Starts: {formatDate(course.start_time)}</p>
              <p className="mb-1">Ends: {formatDate(course.end_time)}</p>
              <button className="btn btn-primary" onClick={() => handleEnrollment(course.id)}>Enroll</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No courses available.</p>
      )}
    </div>
  );
}

export default Courses;
