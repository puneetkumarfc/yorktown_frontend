import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Button = ({text, path, onClick}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    if (path) navigate(path);
  };

  return (
    <div className='flex items-center justify-center gap-1 w-auto px-4 py-3 bg-customOrange hover:bg-transparent transition-all duration-200 border border-customOrange hover:border-customOrange rounded-full text-sm text-white hover:text-customOrange cursor-pointer'
    onClick={handleClick}>
        <p>{text}</p>

        <IoIosArrowForward />
    </div>
  )
}

export default Button