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
    instructor_id: '',
    course_picture_url: ''
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
    const courseData = {
      title: newCourse.title,
      description: newCourse.description,
      start_time: newCourse.start_time,
      end_time: newCourse.end_time,
      instructor_id: newCourse.instructor_id,
      course_picture_url: newCourse.course_picture_url
    };

    await axios.post('http://localhost:3000/courses.json', courseData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    }).then(() => {
      alert('Course created successfully!');
      fetchCourses();
      setNewCourse({ title: '', description: '', start_time: '', end_time: '', instructor_id: '', course_picture_url: '' });
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
          <div key={course.id} className="course-container" >
            <img src={course.course_picture_url} className="course-picture" alt="Course" style={{ width: '700px ', margin: 'center' }} />
            <div className="card" style={{ width: '700px', opacity: 0.85 }}>
              <div className="course-card">
                <div className='card-body'>
                  <h5 className="course-title">{course.title}</h5>
                  <p className="course-description">{course.description}</p>
                  <p className="course-description">{course.start_time}</p>
                  <p className="course-description">{course.end_time}</p>
                  <p className="course-description">
                    Taught by: {course.instructor ? `${course.instructor.first_name} ${course.instructor.last_name}` : 'Unknown'}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    {isLoggedIn && !isAdmin && (
                      <button className="btn-create-course" onClick={() => handleEnrollment(course.id)}>Enroll</button>
                    )}
                    {isAdmin && (
                      <button className="btn btn-danger" style={{ margin: "auto" }} onClick={() => handleDelete(course.id)}>Delete</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="row">
        <div className="">
          <div className="card">
            <div className="card-body">
              <h2 className='title'>Our courses</h2>
              <p className='body-text'>Our mission is to empower individuals</p>
            </div>
          </div>
        </div>
      </div>
      {isAdmin && (
        <div className="create-course-container">
          <h2 className="title">Create New Course</h2>
          <form className='container' onSubmit={handleCreateCourse}>
            <input name="title" type="text" className="form-control mb-3" placeholder="Title" value={newCourse.title} onChange={updateNewCourseData} required />
            <textarea name="description" className="form-control mb-3" placeholder="Description" value={newCourse.description} onChange={updateNewCourseData} required />
            <input name="start_time" type="datetime-local" className="form-control mb-3" placeholder="Start Time" value={newCourse.start_time} onChange={updateNewCourseData} required />
            <input name="end_time" type="datetime-local" className="form-control mb-3" placeholder="End Time" value={newCourse.end_time} onChange={updateNewCourseData} required />
            <input name="instructor_id" type="number" className="form-control mb-3" placeholder="Instructor ID" value={newCourse.instructor_id} onChange={updateNewCourseData} />
            <input name="course_picture_url" type="text" className='form-control mb-3' placeholder="Course Picture URL" value={newCourse.course_picture_url} onChange={updateNewCourseData} required />
            <button type="submit" className="btn btn-primary btn-create-course">Create Course</button>
          </form>
        </div>
      )}
    </div>
  );
}
