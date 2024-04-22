import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Courses() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', start_time: '', end_time: '' });
  const isLoggedIn = !!localStorage.getItem('jwt');
  const isAdmin = localStorage.getItem('role') === 'admin';

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const jwt = localStorage.getItem('jwt');
      const response = await axios.get('http://localhost:3000/courses.json', {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleEnrollment = async (courseId) => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      alert('You must be logged in to enroll in a course.');
      return;
    }
    try {
      await axios.post('http://localhost:3000/course_enrollments.json', {
        course_id: courseId
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`
        }
      });
      alert('Enrollment successful!');
      fetchCourses();
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('Failed to enroll in course.');
    }
  };

  const handleDelete = async (courseId) => {
    const jwt = localStorage.getItem('jwt');
    await axios.delete(`http://localhost:3000/courses/${courseId}.json`, {
      headers: { Authorization: `Bearer ${jwt}` }
    }).then(() => {
      alert('Course deleted successfully');
      fetchCourses();
    }).catch((error) => {
      console.error('Error deleting course:', error);
      alert('Failed to delete course.');
    });
  };

  const handleCreateCourse = async (event) => {
    event.preventDefault();
    const jwt = localStorage.getItem('jwt');
    await axios.post('http://localhost:3000/courses.json', newCourse, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    }).then(() => {
      alert('Course created successfully!');
      fetchCourses();
      setNewCourse({ title: '', description: '', start_time: '', end_time: '' });
    }).catch((error) => {
      console.error('Error creating course:', error);
      alert('Failed to create course.');
    });
  };

  const updateNewCourseData = (event) => {
    const { name, value } = event.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  return (
    <div className="container mt-3">
      <h2 className="mb-3">Courses List</h2>
      {courses.length > 0 ? (
        <div className="list-group">
          {courses.map(course => (
            <div key={course.id} className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h3 className="mb-1">{course.title}</h3>
                {isLoggedIn && !isAdmin && (
                  <button className="btn btn-primary" onClick={() => handleEnrollment(course.id)}>Enroll</button>
                )}
                {isAdmin && (
                  <button className="btn btn-danger" onClick={() => handleDelete(course.id)}>Delete</button>
                )}
              </div>
              <p className="mb-2">{course.description}</p>

            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No courses available.</p>
      )}
      {isAdmin && (
        <div className="mt-5">
          <h2>Create New Course</h2>
          <form onSubmit={handleCreateCourse}>
            <input name="title" type="text" className="form-control mb-3" placeholder="Title" value={newCourse.title} onChange={updateNewCourseData} required />
            <textarea name="description" className="form-control mb-3" placeholder="Description" value={newCourse.description} onChange={updateNewCourseData} required />
            <button type="submit" className="btn btn-primary">Create Course</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Courses;
