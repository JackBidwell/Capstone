import React from 'react';
import { Link } from "react-router-dom";

export function Header() {
  const isLoggedIn = !!localStorage.getItem('jwt');
  const username = localStorage.getItem('name');
  const isAdmin = localStorage.getItem('role') === 'admin';
  const profile_picture = localStorage.getItem('profile_picture');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  const welcomeMessage = isLoggedIn ? (isAdmin ? `Welcome Admin, ${username}` : `Welcome, ${username}`) : 'Welcome!';

  return (
    <div className='Header'>
      <header className="custom-navbar">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="left-side">
            <Link to="/YourAccount" className="navbar-brand">
              {welcomeMessage}
              <img src={profile_picture} alt="Profile" className="header-image" style={{ marginLeft: '10px', borderRadius: '50%' }} />
            </Link>
          </div>
          <Link to="/" className="home-link">
            <img src="/Icon.jpeg" alt="Home" style={{ height: '50px' }} />
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav center-nav">
              {isLoggedIn && isAdmin ? (
                <>
                  <li className="nav-item red-link">
                    <Link to="/courses" className="nav-link">Courses</Link>
                  </li>
                  <li className="nav-item blue-link">
                    <Link to="/members" className="nav-link">Members</Link>
                  </li>
                  <li className="nav-item yellow-link">
                    <Link to="/Attendance" className="nav-link">Attendance</Link>
                  </li>
                  <li className="nav-item green-link">
                    <button className="nav-link btn btn-link" onClick={handleLogout}>Sign Out</button>
                  </li>
                </>
              ) : isLoggedIn ? (
                <>
                  <li className="nav-item red-link">
                    <Link to="/YourCourses" className="nav-link">Your Courses</Link>
                  </li>
                  <li className="nav-item blue-link">
                    <Link to="/courses" className="nav-link">All Courses</Link>
                  </li>
                  <li className="nav-item yellow-link">
                    <Link to="/MessageBoard" className="nav-link">Messages</Link>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn btn-link" onClick={handleLogout}>Sign Out</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item red-link">
                    <Link to="/CreateUser" className="nav-link">Sign Up</Link>
                  </li>
                  <li className="nav-item blue-link">
                    <Link to="/Login" className="nav-link">Sign In</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
