import React from 'react';
import './Home.css';

export default function Home() {
  return (
      <div className="home-page">
        <div className="home-container">
          <div className="home-content">
            <h1 className="home-heading">Welcome to Password Manager</h1>
            <p className="home-description">
              This is a password manager app where you can store, manage, and share your passwords.
            </p>
            <h2 className="home-description"> Created by Xumeiqi Chen</h2>
          </div>
        </div>
      </div>
  );
}
