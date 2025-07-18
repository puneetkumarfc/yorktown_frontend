import React, { useEffect, useState } from 'react'
import { userDetails } from '../../constants/Forms'
import { IoIosArrowForward } from "react-icons/io";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useForm } from 'react-hook-form';

const UserDetails = ({formStep, setFormStep, handleNext}) => {

  const {register, handleSubmit, formState: { errors }} = useForm();

  return (
    <>
        <p className='mb-2 text-xl font-poppins font-bold uppercase text-center'>Enter Your Details</p>
        <p className='text-sm text-white/50 text-center mb-7'>Fill in the details so that we can proceed further with your order. 
        These details will be used to provide you a seamless and secure experience.</p>

        <form className='flex flex-col gap-5 px-4' onSubmit={handleSubmit(handleNext)}>
            {
                userDetails.map((field, index) => {
                    return (
                      <div key={index} className='flex flex-col gap-2'>
                          <input
                          {...register(field.key)}
                          type={field.type}
                          id={field.id}
                          placeholder={field.placeholder}
                          className='border-b border-white/50 py-2 px-2 rounded-t-xl text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white transition duration-200'
                          />
                      </div>
                    )
                })
            }

            <button className='cursor-pointer w-full mt-5 bg-mainRed/90 rounded-full py-3 text-lg font-normal flex items-center justify-center gap-1 hover:gap-2 transition-all duration-200'
            type='submit' value="submit">
              Next <span><IoIosArrowForward /></span>
            </button>
        </form>
    </>
  )
}

export default UserDetails