import React from 'react';

function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">UserFlow</span>
        </div>
        <button onClick={onLogout} className="btn-logout">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
