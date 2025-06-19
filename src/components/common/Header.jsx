import React, { useState } from 'react'
import { FaShoppingBag } from "react-icons/fa";
import { TbMenuDeep } from "react-icons/tb";

const Header = ({toggleSidebar}) => {

  return (
    <div className='w-full flex items-center justify-between text-2xl pt-5'>
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