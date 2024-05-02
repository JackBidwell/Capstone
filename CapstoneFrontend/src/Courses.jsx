import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Courses() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    instructor_id: ''  // Assuming the UI allows setting this
  });
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
      console.log('Courses:', response.data);
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
      setNewCourse({ title: '', description: '', start_time: '', end_time: '', instructor_id: '' });
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

    <div className="Courses container mt-3">
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="..." alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="..." alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="..." alt="Third slide" />
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only"></span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only"></span>
        </a>
      </div>
    </div>
  );
}

export default Courses;
