import React, { useEffect, useState } from 'react'
import { userDetails } from '../../constants/Forms'
import { IoIosArrowForward } from "react-icons/io";
import { IoEye, IoEyeOff } from "react-icons/io5";

const UserDetails = ({formStep, setFormStep, handleNext}) => {

    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });

  return (
    <>
        <p className='mb-2 text-xl font-poppins font-bold uppercase text-center'>Enter Your Details</p>
        <p className='text-sm text-white/50 text-center mb-7'>Fill in the details so that we can proceed further with your order. 
        These details will be used to provide you a seamless and secure experience.</p>

        <form className='flex flex-col gap-5 px-4'>
            {
                userDetails.map((field, index) => {
                    return (
                      <div key={index} className='flex flex-col gap-2'>
                        {
                          field.name === "Password" ? (
                          <div className="relative">
                            <input
                              type={showPassword.password ? "text" : "password"}
                              id={field.id}
                              placeholder={field.placeholder}
                              className='w-full border-b border-white/50 py-2 px-2 pr-10 rounded-t-xl text-sm text-white placeholder:text-white/70 placeholder:opacity-80 focus:outline-none focus:border-white transition duration-200'
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white/70"
                              onClick={() => setShowPassword(prev => ({...prev, password: !showPassword.password}))}>
                              {showPassword.password ? <IoEyeOff /> : <IoEye />}
                            </span>
                          </div>
                          ) : field.name === "Confirm Password" ? (
                              <div className="relative">
                                  <input
                                      type={showPassword.confirmPassword ? "text" : "password"}
                                      id={field.id}
                                      placeholder={field.placeholder}
                                      className='w-full border-b border-white/50 py-2 px-2 pr-10 rounded-t-xl text-sm text-white placeholder:text-white/70 placeholder:opacity-80 focus:outline-none focus:border-white transition duration-200'
                                  />
                                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white/70"
                                      onClick={() => setShowPassword(prev => ({...prev, confirmPassword: !showPassword.confirmPassword}))}>
                                      {showPassword.confirmPassword ? <IoEyeOff /> : <IoEye />}
                                  </span>
                              </div>
                          ) : (
                            <input
                            type={field.type}
                            id={field.id}
                            placeholder={field.placeholder}
                            className='border-b border-white/50 py-2 px-2 rounded-t-xl text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white transition duration-200'
                            />
                          )
                        }
                      </div>
                    )
                })
            }

            <button className='cursor-pointer w-full mt-5 bg-mainRed/90 rounded-full py-3 text-lg font-normal flex items-center justify-center gap-1 hover:gap-2 transition-all duration-200'
            onClick={handleNext}>
                Next <span><IoIosArrowForward /></span>
            </button>
        </form>
    </>
  )
}

export default UserDetails