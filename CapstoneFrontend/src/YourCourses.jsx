import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

export function YourCourses() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchUserCourses = async () => {
      const userId = localStorage.getItem('user_id');
      const jwt = localStorage.getItem('jwt');
      if (!userId || !jwt) {
        console.error("User ID or JWT not found, user must be logged in to see their courses");
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}.json`, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
        console.log(response.data);
        setEnrollments(response.data.course_enrollments);
      } catch (error) {
        console.error('Error fetching user courses:', error);
      }
    };

    fetchUserCourses();
  }, []);

  const handleDropCourse = async (enrollmentId) => {
    const userId = localStorage.getItem('user_id');
    const jwt = localStorage.getItem('jwt');
    if (!userId || !jwt) {
      console.error("User ID or JWT not found, user must be logged in to drop a course");
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/users/${userId}/enrollments/${enrollmentId}.json`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      setEnrollments(enrollments.filter((enrollment) => enrollment.id !== enrollmentId));
    } catch (error) {
      console.error('Error dropping course:', error);
    }
  };

  return (
    <div className="container mt-3">
      <h2 className="mb-3">Your Courses</h2>
      {enrollments.length > 0 ? (
        <div className="list-group">
          {enrollments.map((enrollment) => (
            <div key={enrollment.id} className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h3 className="mb-1">{enrollment.course.title}</h3>
                <button className="btn btn-danger" onClick={() => handleDropCourse(enrollment.id)}>Drop Course</button>
              </div>
              <p className="mb-1">{enrollment.course.description}</p>
              <small className="text-muted">Starts: {new Date(enrollment.course.start_time).toLocaleString()}</small>
              <br />
              <small className="text-muted">Ends: {new Date(enrollment.course.end_time).toLocaleString()}</small>
              <br />
              <span className="badge bg-secondary">{enrollment.status || 'Pending'}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">You are not enrolled in any courses.</p>
      )}
    </div>
  );
}

export default YourCourses;
