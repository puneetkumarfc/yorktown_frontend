import React, { useEffect, useState } from 'react'
import { userDetails } from '../../constants/Forms'
import { IoIosArrowForward } from "react-icons/io";
import { useForm } from 'react-hook-form';

const UserDetails = ({handleNext}) => {

  const {register, handleSubmit, formState: { errors }} = useForm({criteriaMode: "all"});

  return (
    <>
        <p className='mb-2 text-xl font-poppins font-bold uppercase text-center'>Enter Your Details</p>
        <p className='text-sm text-black/70 text-center mb-7'>Fill in the details so that we can proceed further with your order. 
        These details will be used to provide you a seamless and secure experience.</p>

        <form className='flex flex-col gap-5 px-4' onSubmit={handleSubmit(handleNext)}>
            {
                userDetails.map((field, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-2 relative">
                        <input
                          {...register(field.key, {
                            required: `Enter your ${field.name}`,
                            ...(field.key === "customerPhone" && {
                              minLength: {
                                value: 10,
                                message: "Number must be at least 10 digits",
                              },
                              maxLength: {
                                value: 10,
                                message: "Number must be at most 10 digits",
                              },
                            }),
                          })}
                          type={field.type}
                          id={field.id}
                          placeholder={field.placeholder}
                          className="border-b border-black/50 py-2 px-2 rounded-t-xl text-sm text-black placeholder:text-black/50 focus:outline-none focus:border-white transition duration-200"
                        />
                        {errors[field.key] && (
                          <span className="text-red-600 font-medium text-xs absolute top-full mt-1">
                            {errors[field.key].message}
                          </span>
                        )}
                      </div>
                    );
                })
            }

            <button className='cursor-pointer w-full mt-5 bg-mainRed/90 text-white rounded-full py-3 text-lg font-normal flex items-center justify-center gap-1 hover:gap-2 transition-all duration-200'
            type='submit' value="submit">
              Next <span><IoIosArrowForward /></span>
            </button>
        </form>
    </>
  )
}

export default UserDetails