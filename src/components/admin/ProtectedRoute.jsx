import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routeConstant } from '../../constants/RouteConstants';
import { adminAuth } from '../../utils/api';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = adminAuth.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (!authenticated) {
        navigate(routeConstant.ADMIN_LOGIN);
      }
    };

    checkAuth();
  }, [navigate]);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  // Show children if authenticated
  return isAuthenticated ? children : null;
};

export default ProtectedRoute; 