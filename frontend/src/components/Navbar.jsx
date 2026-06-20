import "../styles/Lander.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [userData, setUserData] = useState(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  );
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for storage changes (when user logs in/out)
    const handleStorageChange = (e) => {
      if (e.key === 'isAuthenticated' || e.key === 'user') {
        setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
        setUserData(
          localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
        );
      }
    };

    // Also check for custom event from same tab
    const handleCustomUpdate = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
      setUserData(
        localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
      );
    };

    // Listen to storage events (works across tabs)
    window.addEventListener('storage', handleStorageChange);
    // Custom event for same-tab updates
    window.addEventListener('authStateChanged', handleCustomUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authStateChanged', handleCustomUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    localStorage.setItem('isAuthenticated', 'false');
    
    // Dispatch custom event to trigger navbar update
    window.dispatchEvent(new Event('authStateChanged'));
    
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="/" className="logo">
          <span className="logo-mark">हB</span>
          HamroBhet
        </a>
        <nav className="nav-mid nav-links">
          <a href="/exp">Explore Creators</a>
          <a href="#become-creator">Become a Creator</a>
        </nav>
        <div className="nav-actions">
         {isAuthenticated ? (
            <>
              <span className="user-name">Welcome, {userData?.first_name + ' ' + userData?.last_name || 'User'}</span>  
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <> <a href="/login" className="btn btn-ghost">Login</a>
          <a href="/signup" className="btn btn-primary">Sign up</a> </>
          )}
        </div>
        <button className="hamburger" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;