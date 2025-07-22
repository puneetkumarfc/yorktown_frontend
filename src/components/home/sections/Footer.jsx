import React from 'react'
import { AiFillInstagram } from 'react-icons/ai'
import { FaFacebook, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='relative z-10 border-t border-black/20 py-6 px-[2rem] -mx-[2rem] flex items-center justify-between'>
        <p className='font-roboto font-normal text-black/70 text-sm'>© 2025 YorkTown. All rights reserved.</p>

        <div className='flex gap-6 items-center text-2xl text-black'>
          <a href="https://www.instagram.com/eatatyorktown?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <AiFillInstagram className='hover:text-customOrange transition-all duration-100 cursor-pointer'/>
          </a>

            {/* <FaTwitter  className='hover:text-customOrange transition-all duration-100 cursor-pointer'/> */}

            <FaFacebook  className='hover:text-customOrange transition-all duration-100 cursor-pointer'/>
        </div>
    </div>
  )
}

export default Footer