import React, { useEffect, useState } from 'react'
import { userDetails } from '../../constants/Forms'
import { IoIosArrowForward } from "react-icons/io";

const UserDetails = () => {

    const [progress, setProgress] = useState(0);

    useEffect(() => {
      setProgress(20);
    }, []);

  return (
    <div className=''>
        <p className='mb-2 text-xl font-poppins font-bold uppercase text-center'>Enter Your Details</p>
        <p className='text-sm text-white/50 text-center mb-7'>Fill in the details so that we can proceed further with your order. 
        These details will be used to provide you a seamless and secure experience.</p>

        <div className="w-full bg-white/20 rounded-full h-2 mb-6">
          <div className="bg-mainRed h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>

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

            <button className='w-full mt-5 bg-mainRed/90 rounded-full py-3 text-lg font-normal flex items-center justify-center gap-1 hover:gap-2 transition-all duration-200'>
                Next <span><IoIosArrowForward /></span>
            </button>
        </form>
    </div>
  )
}

export default UserDetails