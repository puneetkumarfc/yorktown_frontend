import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-mainBg px-4 py-12">
      {/* Pizza box illustration - improved */}
      <div className="mb-8">
        <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Box base */}
          <rect x="30" y="70" width="120" height="40" rx="8" fill="#E1D5BD" stroke="#BD390E" strokeWidth="2"/>
          {/* Box lid (open) */}
          <rect x="40" y="30" width="100" height="40" rx="8" fill="#F1EEE8" stroke="#BD390E" strokeWidth="2"/>
          {/* Lid shadow */}
          <ellipse cx="90" cy="70" rx="48" ry="8" fill="#E1D5BD" opacity="0.3" />
          {/* Flaps */}
          <polygon points="30,70 40,30 50,38 50,70" fill="#F1EEE8" stroke="#BD390E" strokeWidth="2"/>
          <polygon points="150,70 140,30 130,38 130,70" fill="#F1EEE8" stroke="#BD390E" strokeWidth="2"/>
          {/* Empty pizza shadow */}
          <ellipse cx="90" cy="90" rx="32" ry="12" fill="#F4F9F5" stroke="#BD390E" strokeWidth="1.5"/>
          {/* 3D shadow under box */}
          <ellipse cx="90" cy="115" rx="54" ry="8" fill="#BD390E" opacity="0.10" />
          {/* Lid text */}
          <text x="90" y="55" textAnchor="middle" fill="#BD390E" fontSize="16" fontFamily="Poppins, sans-serif" fontWeight="bold">Pizza Box</text>
          {/* Empty text inside box */}
          <text x="90" y="95" textAnchor="middle" fill="#C42A2A" fontSize="13" fontFamily="Poppins, sans-serif">(Empty)</text>
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-customOrange mb-2">404 - Page Not Found</h1>
      <p className="text-lg text-black/70 mb-6 text-center max-w-md">Looks like this pizza box is empty! The page you’re looking for doesn’t exist or has been moved.</p>
      <button
        className="px-6 py-3 bg-customOrange text-white rounded-full font-semibold text-base shadow-md hover:bg-mainRed transition-colors"
        onClick={() => navigate('/menu')}
      >
        Go to Menu
      </button>
    </div>
  );
};

export default NotFound; 