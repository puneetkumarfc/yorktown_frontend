import React, { useState } from 'react'
import { FaShoppingBag } from "react-icons/fa";
import { TbMenuDeep } from "react-icons/tb";

const Header = ({toggleSidebar}) => {

  return (
    <div className='w-full flex items-center justify-between text-2xl py-4 px-[6rem] fixed top-0 left-0 right-0 bg-black border-b-[0.2px] border-white/40 z-10'>
        <p className='font-bold'>York<span className='text-mainRed'>T</span>own</p>

        <div className='flex items-center gap-8'>
            <div className='p-2 cursor-pointer'>
              <FaShoppingBag />
            </div>

            <div className='p-2 cursor-pointer'
            onClick={() => toggleSidebar()}>
              <TbMenuDeep/>
            </div>
        </div>

        
    </div>
  )
}

export default Header