import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function Content() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/CreateUser' element={<CreateUser />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/MessageBoard' element={<MessageBoard />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/YourCourses" element={<YourCourses />} />
        <Route path="/YourAccount" element={<YourAccount />} />
        <Route path='/members' element={<Members />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Content;
