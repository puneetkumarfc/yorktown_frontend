import React, { useState } from 'react'
import { FaShoppingBag } from "react-icons/fa";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { routeConstant } from '../../constants/RouteConstants';

const Header = ({toggleSidebar}) => {

  const navigate = useNavigate();

  return (
    <div className='w-full flex items-center justify-between text-2xl py-4 px-[1rem] md:px-[6rem] fixed top-0 left-0 right-0 bg-black border-b-[0.2px] border-white/40 z-10'>
        <p onClick={() => navigate(routeConstant.HOME)} className='font-bold cursor-pointer'>York<span className='text-mainRed'>T</span>own</p>

        <div className='flex items-center gap-8'>
            <div className='p-2 cursor-pointer'
            onClick={() => navigate(routeConstant.BAG)}>
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