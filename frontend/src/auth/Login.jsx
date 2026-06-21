import React, { useEffect } from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
  </svg>
);

const TRUST_ITEMS = [
  'Secure Google authentication',
  'No passwords required',
  'Your sessions stay private',
];

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, []);

  const handleGoogleLogin = () => {
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <div className="page">

      {/* LEFT (was RIGHT on signup): sign-in card */}
      <div className="right">
        <div className="card">

          <div className="card-brand">
            <div className="card-tagline">Support Nepali creators directly</div>
          </div>

          <div className="panel">
            <div className="panel-heading">Welcome back</div>
            <div className="panel-sub">Sign in with Google to continue</div>

            <button className="google-btn" type="button" onClick={handleGoogleLogin}>
              <GoogleIcon />
              Continue with Google
            </button>

            <div className="value-strip">
              <p>Pick up right where you left off — your subscriptions, your creators, your community.</p>
            </div>

            <div className="trust-list">
              {TRUST_ITEMS.map((item) => (
                <div className="trust-item" key={item}>
                  <span className="trust-icon">
                    <CheckIcon />
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <hr className="divider-line" />

            <div className="social-proof-mini">
              <div className="mini-avatars">
                <div className="mini-avatar a1">स</div>
                <div className="mini-avatar a2">R</div>
                <div className="mini-avatar a3">अ</div>
                <div className="mini-avatar a4">M</div>
              </div>
              <span className="social-proof-text">Trusted by early supporters across Nepal</span>
            </div>
          </div>

          <div className="footer-text">
            By continuing, you agree to HamroBhet's<br />
            <a href="/terms">Terms of Service</a> &amp; <a href="/privacy">Privacy Policy</a>
          </div>

          <div className="switch-row">
            New to HamroBhet? <a href="/signup">Create an account</a>
          </div>

        </div>
      </div>

      {/* RIGHT (was LEFT on signup): story / trust / community */}
      <div className="left">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="devanagari-mark">भेट</div>

        <div className="left-top">
          <div className="logo-row">
            <div className="logo-mark">भ</div>
            <span className="logo-text">HamroBhet</span>
          </div>
        </div>

        <div className="left-mid">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            Nepal's creator economy, finally connected
          </span>
          <h1 className="headline">
            Welcome back to <span className="accent">HamroBhet</span>
          </h1>
          <p className="description">
            Your favorite Nepali creators — artists, educators, musicians, and developers — are waiting for you on the other side of this sign-in.
          </p>

          <div className="stats-row">
            <div>
              <div className="stat-num">3,000+</div>
              <div className="stat-label">Supporters already joined</div>
            </div>
            <div>
              <div className="stat-num">100+</div>
              <div className="stat-label">Creators onboarded</div>
            </div>
          </div>

          <div className="avatars-block">
            <div className="avatar-stack">
              <div className="avatar a1">सि</div>
              <div className="avatar a2">RP</div>
              <div className="avatar a3">अ</div>
              <div className="avatar a4">MK</div>
              <div className="avatar a5">+</div>
            </div>
            <div className="avatars-text">
              Joined by supporters in<br />
              <strong>Kathmandu, Pokhara &amp; beyond</strong>
            </div>
          </div>
        </div>

        <div className="left-bottom">
          <div className="left-tagline">
            <span className="pulse-dot" />
            Be part of Nepal's new creator economy
          </div>
        </div>
      </div>

    </div>
  );
}