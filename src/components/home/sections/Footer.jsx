import React from 'react'
import { AiFillInstagram } from 'react-icons/ai'
import { FaFacebook, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='z-10 border-t-[0.2px] border-white/40 py-6 px-[6rem] -mx-[6rem] flex items-center justify-between'>
        <p className='font-archivo font-light text-white/70'>© 2025 YorkTown. All rights reserved.</p>

        <div className='flex gap-6 items-center text-2xl text-white'>
            <AiFillInstagram className='hover:text-mainYellow/80 transition-all duration-100 cursor-pointer'/>

            <FaTwitter  className='hover:text-mainYellow/80 transition-all duration-100 cursor-pointer'/>

            <FaFacebook  className='hover:text-mainYellow/80 transition-all duration-100 cursor-pointer'/>
        </div>
    </div>
  )
}

export default Footer