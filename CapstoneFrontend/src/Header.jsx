import React from 'react';
import { Link } from "react-router-dom";

export function Header() {
  const isLoggedIn = !!localStorage.getItem('jwt');
  const username = localStorage.getItem('name');
  const isAdmin = localStorage.getItem('role') === 'admin';

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  const welcomeMessage = isLoggedIn ? (isAdmin ? `Welcome Admin, ${username}` : `Welcome, ${username}`) : 'Welcome!';

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">{welcomeMessage}</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {isLoggedIn && isAdmin ? (
              <>
                <li className="nav-item">
                  <Link to="/courses" className="nav-link">Courses</Link>
                </li>
                <li className="nav-item">
                  <Link to="/members" className="nav-link">Members</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Attendance" className="nav-link">Attendance</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>Sign Out</button>
                </li>
              </>
            ) : isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link to="/YourCourses" className="nav-link">Your Courses</Link>
                </li>
                <li className="nav-item">
                  <Link to="/courses" className="nav-link">All Courses</Link>
                </li>
                <li className="nav-item">
                  <Link to="/MessageBoard" className="nav-link">Messages</Link>
                </li>
                <li className="nav-item">
                  <Link to="/YourAccount" className="nav-link">Your Account</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>Sign Out</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/CreateUser" className="nav-link">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Login" className="nav-link">Sign In</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
