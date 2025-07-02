import React from 'react'
import { userDetails } from '../../constants/Forms'
import { IoIosArrowForward } from "react-icons/io";

const UserDetails = () => {
  return (
    <div className=''>
        <p className='mb-10 text-xl font-poppins font-bold uppercase text-center'>Enter Your Details</p>
        <form className='flex flex-col gap-5 px-4'>
            {
                userDetails.map((field, index) => {
                    return (
                        <div key={index} className='flex flex-col gap-2'>
                            <input
                                type={field.type}
                                id={field.id}
                                placeholder={field.placeholder}
                                className='border-b border-white/50 py-2 px-2 rounded-t-xl text-sm text-white placeholder:text-white/70 focus:outline-none focus:border-white transition duration-200'
                            />
                        </div>
                    )
                })
            }

            <button className='w-full mt-5 bg-mainRed/80 rounded-full py-3 text-lg font-normal flex items-center justify-center'>
                Next <span><IoIosArrowForward /></span>
            </button>
        </form>
    </div>
  )
}

export default UserDetails