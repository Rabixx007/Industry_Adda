import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>🚀 Innovator's Adda</h2>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/search">Search</Link>
        <Link to="/match">Match</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/feed">Feed</Link>
        <button onClick={onLogout} className="btn-logout">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;