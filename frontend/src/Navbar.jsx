import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ isAuthenticated, username, onLogout }) {
  return (
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          {isAuthenticated ? (
              <>
                <li>Welcome, {username}</li>
                <li><button onClick={onLogout}>Logout</button></li>
              </>
          ) : (
              <li><Link to="/login">Login</Link> | <Link to="/register">Register</Link></li>
          )}
        </ul>
      </nav>
  );
}
