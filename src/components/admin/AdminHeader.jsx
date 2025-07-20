import React from 'react';
import { adminAuth } from '../../utils/api';

const AdminHeader = ({ sidebarWidth }) => {
  const currentUser = adminAuth.getCurrentUser();
  return (
    <div
      className='w-full flex items-center justify-between text-2xl py-4 px-8 md:px-24 fixed top-0 left-0 right-0 bg-[#f1eee8] border-b-[0.2px] border-[#bd390e] z-10'
      style={sidebarWidth !== undefined ? { marginLeft: sidebarWidth } : {}}
    >
      <p className='font-bold cursor-pointer text-[#000000]'>York<span className='text-[#bd390e]'>T</span>own</p>
      
      {currentUser && (
        <div className="text-sm text-[#000000]/70" style={sidebarWidth !== undefined && sidebarWidth !== 64 ? { marginRight: '10%' } : {}}>
          Welcome, {currentUser.email || 'Admin'}
        </div>
      )}
    </div>
  );
};

export default AdminHeader; 