// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
 // We'll reuse the same CSS for consistency

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logged out');
    // Add your logout logic here (e.g., clear token from localStorage)
    navigate('/login'); // Redirect to a login page (you can create this later)
  };

  return (
    <nav className="navbar">
      <div className="logo">SafeDrive</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/statistics">Statistics</Link>
        <Link to="/profile">Profile</Link>
        <button className="logout-btn" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
    </nav>
  );
};

export default Navbar;