import React from 'react'
import { AiFillInstagram } from 'react-icons/ai'
import { FaFacebook, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='relative z-10 border-t border-black/20 py-6 px-[6rem] -mx-[1rem] flex items-center justify-between'>
        <p className='font-roboto font-normal text-black/70 text-sm'>© 2025 YorkTown. All rights reserved.</p>

        <div className='flex gap-6 items-center text-2xl text-black'>
            <AiFillInstagram className='hover:text-customOrange transition-all duration-100 cursor-pointer'/>

            <FaTwitter  className='hover:text-customOrange transition-all duration-100 cursor-pointer'/>

            <FaFacebook  className='hover:text-customOrange transition-all duration-100 cursor-pointer'/>
        </div>
    </div>
  )
}

export default Footer