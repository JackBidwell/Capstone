import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function Courses() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    instructor_id: ''
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
      setCourses(response.data);
      console.log(response.data);
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    centerMode: true,
    centerPadding: '50px',
  };

  return (
    <div className="Courses">
      <Slider {...settings}>
        {courses.map(course => (
          <div key={course.id} className="course-container">
            <img src={`http://localhost:3000${course.course_picture}`} className="course-picture" alt="Course" />
            <div className="">
              <h5 className="course-title">{course.title}</h5>
              <p className="course-description">{course.description}</p>
              <p className='course-instructor'>Taught by: {course.instructor.first_name}</p>
              <div className="d-flex justify-content-between align-items-center">
                {isLoggedIn && !isAdmin && (
                  <button className="btn btn-primary" onClick={() => handleEnrollment(course.id)}>Enroll</button>
                )}
                {isAdmin && (
                  <button className="btn btn-danger" onClick={() => handleDelete(course.id)}>Delete</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </Slider>
      {isAdmin && (
        <div className="create-course-container">
          <h2 className="title">Create New Course</h2>
          <form className='container' onSubmit={handleCreateCourse}>
            <input name="title" type="text" className="form-control mb-3" placeholder="Title" value={newCourse.title} onChange={updateNewCourseData} required />
            <textarea name="description" className="form-control mb-3" placeholder="Description" value={newCourse.description} onChange={updateNewCourseData} required />
            <input name="start_time" type="datetime-local" className="form-control mb-3" placeholder="Start Time" value={newCourse.start_time} onChange={updateNewCourseData} required />
            <input name="end_time" type="datetime-local" className="form-control mb-3" placeholder="End Time" value={newCourse.end_time} onChange={updateNewCourseData} required />
            <input name="instructor_id" type="number" className="form-control mb-3" placeholder="Instructor ID" value={newCourse.instructor_id} onChange={updateNewCourseData} />
            <button type="submit" className="btn btn-primary btn-create-course">Create Course</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Courses;
