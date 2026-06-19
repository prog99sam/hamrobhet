import '../styles/Home.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  
  if (!user) {
    return (
      <div className="home-page">
        <div className="home-content">
          <div style={{ textAlign: 'center', paddingTop: '60px' }}>
            <div style={{ fontSize: '24px', color: 'var(--ink-soft)' }}>Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  // Get user initials for avatar
  const getInitials = () => {
    const first = user.first_name?.charAt(0) || 'U';
    const last = user.last_name?.charAt(0) || 'S';
    return (first + last).toUpperCase();
  };

  return (
    <div className="home-page">
      <div className="home-content">
        {/* Welcome Header */}
        <div className="home-header">
          <div className="welcome-section">
            <h1>Welcome, <span className="welcome-name">{user.first_name || 'User'}</span>! 👋</h1>
            <p>You're all set! Explore the platform and discover amazing creators to support.</p>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="user-profile-card">
          <div className="user-avatar">{getInitials()}</div>
          <div className="user-info">
            <h2>
              {user.first_name} {user.last_name}
              <svg viewBox="0 0 20 20" fill="var(--green)" style={{ width: '18px', height: '18px' }}>
                <path d="M10 0l2.4 1.4 2.7-.4 1.3 2.4 2.4 1.3-.4 2.7L20 10l-1.6 2.4.4 2.7-2.4 1.3-1.3 2.4-2.7-.4L10 20l-2.4-1.6-2.7.4-1.3-2.4-2.4-1.3.4-2.7L0 10l1.6-2.4-.4-2.7 2.4-1.3L4.9 1z" />
              </svg>
            </h2>
            <p>📧 {user.email}</p>
            <div className="user-stats">
              <div className="stat-item">
                <b>0</b>
                <span>Supports</span>
              </div>
              <div className="stat-item">
                <b>0</b>
                <span>Following</span>
              </div>
              <div className="stat-item">
                <b>Rs 0</b>
                <span>Monthly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="btn btn-primary">🔍 Explore Creators</button>
            <button className="btn btn-secondary">❤️ My Supports</button>
            <button className="btn btn-secondary">📊 Dashboard</button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="home-grid">
          <div className="dashboard-card">
            <div className="card-icon">🎨</div>
            <h3>Featured Creators</h3>
            <p>Discover talented Nepali artists, musicians, educators, and tech creators making amazing work.</p>
            <a href="#" className="card-link">Browse Creators</a>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">❤️</div>
            <h3>My Supports</h3>
            <p>Manage your monthly subscriptions and see all the creators you're supporting.</p>
            <a href="#" className="card-link">View Supports</a>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">💳</div>
            <h3>Payment Methods</h3>
            <p>Add and manage your payment methods. We support eSewa, Khalti, and credit cards.</p>
            <a href="#" className="card-link">Manage Payments</a>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">⚙️</div>
            <h3>Account Settings</h3>
            <p>Update your profile, preferences, and account security settings.</p>
            <a href="#" className="card-link">Go to Settings</a>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📱</div>
            <h3>Get the App</h3>
            <p>Support your favorite creators on the go with our mobile app.</p>
            <a href="#" className="card-link">Download App</a>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">💬</div>
            <h3>Support</h3>
            <p>Got questions? Our support team is here to help you get the most out of HamroBhet.</p>
            <a href="#" className="card-link">Contact Support</a>
          </div>
        </div>

       
      </div>
    </div>
  );
}