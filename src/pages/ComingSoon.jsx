import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import Button from '../components/common/Button';

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-mainBg px-4 py-12 text-center">
      <div className="mb-8 animate-fade-in-down">
        <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="90" cy="125" rx="50" ry="8" fill="#BD390E" opacity="0.10" />
          <path d="M60 120L80 40H100L120 120H60Z" fill="#FF8C00" stroke="#A0522D" strokeWidth="2"/>
          <rect x="87" y="55" width="6" height="15" fill="white" rx="1"/>
          <rect x="87" y="85" width="6" height="15" fill="white" rx="1"/>
          <rect x="55" y="120" width="70" height="8" fill="#A0522D" rx="2"/>
        </svg>
      </div>
      <h1 className="text-xl font-bold text-customOrange mb-2 font-roboto_serif animate-fade-in-simple">Coming Soon!</h1>
      <p className="text-sm text-black/50 mb-6 max-w-md animate-fade-in-up">
        We're working hard to bring you home delivery. This feature is currently under construction.
      </p>
      
      <Button text={"Go Back"} onClick={() => navigate(-1)}/>
    </div>
  );
};

export default ComingSoon;