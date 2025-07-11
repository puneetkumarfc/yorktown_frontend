import React from 'react';
import { adminAuth } from '../../utils/api';

const AdminHeader = ({ sidebarWidth }) => {
  const currentUser = adminAuth.getCurrentUser();

  return (
    <div
      className='w-full flex items-center justify-between text-2xl py-4 px-8 md:px-24 fixed top-0 left-0 right-0 bg-black border-b-[0.2px] border-white/40 z-10'
      style={sidebarWidth !== undefined ? { marginLeft: sidebarWidth } : {}}
    >
      <p className='font-bold cursor-pointer'>York<span className='text-mainRed'>T</span>own</p>
      
      {currentUser && (
        <div className="text-sm text-white/70">
          Welcome, {currentUser.email || 'Admin'}
        </div>
      )}
    </div>
  );
};

export default AdminHeader; 