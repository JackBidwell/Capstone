import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Header from './Header';
import Footer from './Footer';
import { Home } from './Home';
import { CreateUser } from './CreateUser';
import { Login } from './Login';
import { MessageBoard } from './MessageBoard';
import { Courses } from './Courses';
import { YourCourses } from './YourCourses';
import { YourAccount } from './YourAccount';
import { Members } from './Members';
import { Attendance } from './Attendance';
import './App.css'; // Ensure you import your CSS for animations

function Content() {
  let location = useLocation();

  return (
    <>
      <Header />
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={300}
          classNames="fade"
        >
          <Routes location={location}>
            <Route path='/' element={<Home />} />
            <Route path='/CreateUser' element={<CreateUser />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/MessageBoard' element={<MessageBoard />} />
            <Route path="/Courses" element={<Courses />} />
            <Route path="/YourCourses" element={<YourCourses />} />
            <Route path="/YourAccount" element={<YourAccount />} />
            <Route path='/members' element={<Members />} />
            <Route path='/Attendance' element={<Attendance />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </>
  );
}

export default Content;
