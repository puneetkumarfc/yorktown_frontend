import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';
import { routeConstant } from '../../constants/RouteConstants';
import { adminAuth, validation, handleApiError } from '../../utils/api';
import { useLoader } from '../../components/common/LoaderContext';
import { Eye, EyeOff } from 'lucide-react';
import { formFields } from '../../constants/AdminLogin';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [backendError, setBackendError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!validation.required(formData.email)) {
      setError('Email is required');
      return false;
    }
    if (!validation.required(formData.password)) {
      setError('Password is required');
      return false;
    }
    if (!validation.email(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!validation.password(formData.password)) {
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
      const result = await adminAuth.login(formData.email.trim(), formData.password);
      
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
    <div id="admin-login-page" className="w-[100vw] h-[100vh] overflow-hidden flex items-center gap-2 bg-white p-2">
      <div className="h-full w-[70%] overflow-hidden rounded-xl">
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop" alt="Restaurant" className="h-full w-full object-cover" />
      </div>

      <div className="w-[30%]">
        <div className="w-full px-4">
          <h2 className="font-roboto_serif text-black text-center font-bold text-2xl mb-4">Admin Login</h2>
          
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {formFields.map((field) => (
              <div className="flex flex-col" key={field.id}>
                <label htmlFor={field.id} className='text-black/70 text-sm font-roboto'>{field.label}</label>
                {
                  field.type === 'password' ? (
                  <div className="relative w-full">
                    <input
                      id={field.id}
                      name={field.name}
                      type={showPassword ? 'text' : 'password'}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      required
                      className='border border-black/20 w-full py-3 pl-2 pr-10 rounded-xl text-black placeholder:text-black/30 placeholder:text-sm text-sm focus:outline-none focus:border-black'
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 cursor-pointer right-0 flex items-center pr-3 text-gray-400 hover:text-black"
                      onClick={() => setShowPassword((v) => !v)}
                      tabIndex="-1"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                ) : (
                  <input
                    {...field}
                    className='border border-black/20 w-full py-3 px-2 rounded-xl placeholder:text-black/30 placeholder:text-sm text-black text-sm focus:outline-none focus:border-black'
                    value={formData[field.name]}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                )}
              </div>
            ))}
            {error && <div className="admin-login-error">{error}</div>}
            <button 
              className={`mt-4 border border-black rounded-xl cursor-pointer text-white font-semibold bg-black/90 hover:bg-white hover:text-black/90 transition-all duration-150
               py-2 w-full ${isLoading ? 'admin-login-btn-loading' : ''}`} 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
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