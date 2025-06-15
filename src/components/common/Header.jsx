import React from 'react'
import { FaShoppingBag } from "react-icons/fa";
import { TbMenuDeep } from "react-icons/tb";

const Header = () => {
  return (
    <div className='w-full flex items-center justify-between text-2xl pt-5'>
        <p className='font-bold'>York<span className='text-mainRed'>T</span>own</p>

        <div className='flex items-center justify-between w-[8%]'>
            <FaShoppingBag />

            <TbMenuDeep />
        </div>
    </div>
  )
}

export default Header