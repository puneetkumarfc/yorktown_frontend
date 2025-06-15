import React from 'react'
import { IoIosArrowForward } from "react-icons/io";

const Button = ({text}) => {
  return (
    <div className='flex items-center gap-1 w-auto px-4 py-3 bg-transparent hover:bg-mainYellow/80 transition-all duration-200
    border border-mainYellow/50 hover:border-transparent rounded-full text-sm text-mainYellow hover:text-white cursor-pointer'>
        <p>{text}</p>

        <IoIosArrowForward />
    </div>
  )
}

export default Button