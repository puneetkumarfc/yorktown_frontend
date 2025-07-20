import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';
import { routeConstant } from '../../constants/RouteConstants';
import { adminAuth, validation, handleApiError } from '../../utils/api';
import { useLoader } from '../../components/common/LoaderContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [backendError, setBackendError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  const validateForm = () => {
    if (!validation.required(email)) {
      setError('Email is required');
      return false;
    }
    
    if (!validation.required(password)) {
      setError('Password is required');
      return false;
    }
    
    if (!validation.email(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (!validation.password(password)) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');
    setShowErrorPopup(false);
    setShowSuccessPopup(false);
    setBackendError('');
    setSuccessMessage('');

    try {
      const result = await adminAuth.login(email.trim(), password);
      
      // Success - show success popup then redirect
      setSuccessMessage(result.message || 'Login successful');
      setShowSuccessPopup(true);
      
      // Redirect to admin dashboard after a short delay
      setTimeout(() => {
        navigate(routeConstant.ADMIN_DASHBOARD);
      }, 1500);
      
    } catch (error) {
      console.error('Login error:', error);
      
      const errorMessage = handleApiError(error);
      setBackendError(errorMessage);
      setShowErrorPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closeErrorPopup = () => {
    setShowErrorPopup(false);
    setBackendError('');
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
    setSuccessMessage('');
    // Navigate immediately if user closes the popup
    navigate(routeConstant.ADMIN_DASHBOARD);
  };

  return (
    <div className="admin-login-bg">
      <div className="admin-login-content-wrapper">
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <h2 className="admin-login-title">Admin Login</h2>
          <div className="admin-login-field">
            <label htmlFor="admin-email">Email</label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="username"
              required
              disabled={isLoading}
            />
          </div>
          <div className="admin-login-field admin-login-password-field">
            <label htmlFor="admin-password">Password</label>
            <div className="admin-login-password-wrapper">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                disabled={isLoading}
              />
              <span
                className={"admin-login-eye-icon" + (showPassword ? ' visible' : '')}
                onClick={() => setShowPassword(v => !v)}
                tabIndex={0}
                role="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{ userSelect: 'none' }}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>
          {error && <div className="admin-login-error">{error}</div>}
          <button 
            className={`admin-login-btn ${isLoading ? 'admin-login-btn-loading' : ''}`} 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="error-popup-overlay" onClick={closeErrorPopup}>
          <div className="error-popup" onClick={(e) => e.stopPropagation()}>
            <div className="error-popup-header">
              <h3>Login Error</h3>
              <button className="error-popup-close" onClick={closeErrorPopup}>
                ×
              </button>
            </div>
            <div className="error-popup-content">
              <p>{backendError}</p>
            </div>
            <div className="error-popup-footer">
              <button className="error-popup-btn" onClick={closeErrorPopup}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="success-popup-overlay" onClick={closeSuccessPopup}>
          <div className="success-popup" onClick={(e) => e.stopPropagation()}>
            <div className="success-popup-header">
              <h3>Login Successful</h3>
              <button className="success-popup-close" onClick={closeSuccessPopup}>
                ×
              </button>
            </div>
            <div className="success-popup-content">
              <div className="success-icon">✓</div>
              <p>{successMessage}</p>
              <p className="success-subtitle">Redirecting to dashboard...</p>
            </div>
            <div className="success-popup-footer">
              <button className="success-popup-btn" onClick={closeSuccessPopup}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin; 