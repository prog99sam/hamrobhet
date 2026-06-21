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
    const handleStorageChange = (e) => {
      if (e.key === 'isAuthenticated' || e.key === 'user') {
        setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
        setUserData(
          localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
        );
      }
    };

    const handleCustomUpdate = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
      setUserData(
        localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
      );
    };

    window.addEventListener('storage', handleStorageChange);
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
            <div className="user-info">
              <span>Welcome, {userData ? userData.first_name + ' ' + userData.last_name : 'Guest'}!</span>
              <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <>
              <a href="/login" className="btn btn-ghost">Login</a>
              <a href="/signup" className="btn btn-primary">Sign up</a>
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
