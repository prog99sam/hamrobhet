import "../styles/Login.css";
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function GoogleIcon() {
  return (
    <svg className="google-icon" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
    </svg>
  );
}

export default function Login({ onLogin }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('[DEBUG] Google token received, sending to backend...');
      
      // Send the token ID to Django backend
      const response = await axios.post('http://localhost:8000/api/auth/google/', {
        token: credentialResponse.credential, 
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('[DEBUG] Backend response:', response.data);
      
      // Handle your Django backend response (e.g., store backend JWT token)
      console.log('Django Backend Login Success:', response.data);
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Call onLogin callback if provided
      if (onLogin) {
        onLogin(response.data.user);
      }
      setTimeout(() => {
        navigate('/home');
      }, 1500);      
    } catch (error) {
      console.error('[DEBUG] Authentication failed:', error);
      console.error('[DEBUG] Error response:', error.response?.data);
      
      const errorMsg = error.response?.data?.error || error.response?.data?.details || error.message;
      setError(`Login failed: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <span className="login-logo-mark">हB</span>
          HamroBhet
        </div>
        <p className="login-subtitle">Support Nepali Creators Directly</p>

        {error && (
          <div style={{
            padding: '12px',
            marginBottom: '16px',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '4px',
            color: '#c33',
            fontSize: '14px',
            wordBreak: 'break-word'
          }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ padding: '12px', textAlign: 'center', color: '#666' }}>
            Signing you in...
          </div>
        ) : (
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
              console.log('Google login failed');
              setError('Google login failed. Please try again.');
            }}
          />
        )}

        <div className="login-trust">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V7a4 4 0 018 0v4" />
          </svg>
          Secure Google login. No passwords required.
        </div>

        <p className="login-footer">
          By continuing, you agree to HamroBhet's{" "}
          <a href="/terms">Terms</a> &amp; <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}