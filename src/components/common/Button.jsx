import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Button = ({text, path}) => {

  const navigate = useNavigate();

  return (
    <div className='flex items-center gap-1 w-auto px-4 py-3 bg-transparent hover:bg-mainYellow/70 transition-all duration-200
    border border-mainYellow/70 hover:border-transparent rounded-full text-sm text-mainYellow hover:text-white cursor-pointer'
    onClick={() => navigate(path)}>
        <p>{text}</p>

        <IoIosArrowForward />
    </div>
  )
}

export default Button