import React from 'react';
import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebook, FaTwitter } from 'react-icons/fa';

const AdminFooter = ({ sidebarWidth }) => {
  return (
    <div
      className='z-50 relative border-t-[0.2px] border-[#bd390e] py-6 px-[6rem] flex items-center justify-between bg-[#f1eee8]'
      style={sidebarWidth !== undefined ? { marginLeft: sidebarWidth } : {}}
    >
      <p className='font-archivo font-light text-[#000000]/70'>© 2025 YorkTown. All rights reserved.</p>
      <div className='flex gap-6 items-center text-2xl text-[#000000]'>
        <a href='https://instagram.com/eatatyorktown' target='_blank' rel='noopener noreferrer'>
          <AiFillInstagram className='hover:text-[#bd390e] transition-all duration-100 cursor-pointer'/>
        </a>
        <FaFacebook className='hover:text-[#bd390e] transition-all duration-100 cursor-pointer'/>
      </div>
    </div>
  );
};

export default AdminFooter; 