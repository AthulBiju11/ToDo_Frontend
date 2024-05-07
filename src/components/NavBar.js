import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

function Navbar({ username }) {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <span>Welcome, {username}</span>
      </div>
      <div className="navbar-right">
        
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
