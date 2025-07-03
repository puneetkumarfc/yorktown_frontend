import React, { useState } from 'react'
import { addressForm } from '../../constants/Forms';
import { IoIosArrowForward } from "react-icons/io";

const AddressDetails = ({handleNext}) => {

  const [deliveryOption, setDeliveryOption] = useState("Home Delivery")

  const toggleOption = () => {
    setDeliveryOption(prev => prev === "Home Delivery" ? "Takeaway" : "Home Delivery");
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='w-fit flex items-center gap-4 py-1 px-1 rounded-full border mb-8'>
        <p className={`${deliveryOption === "Home Delivery" ? "bg-white text-black" : "text-white hover:bg-white/20"} cursor-pointer font-normal  h-full px-3 py-3 rounded-full`}
        onClick={toggleOption}>Home Delivery</p>
        <p className={`${deliveryOption === "Takeaway" ? "bg-white text-black" : "text-white hover:bg-white/20"} cursor-pointer font-normal  h-full px-3 py-3 rounded-full`}
        onClick={toggleOption}>Takeaway</p>
      </div>

      <p className='mb-2 text-xl font-poppins font-bold uppercase text-center'>Enter Your Address</p>
      <p className='text-sm text-white/50 text-center mb-7'>Please provide your address, so that we can place your order.</p>

      <form className='flex flex-col gap-5 px-4 w-full'>
        {
          addressForm.map((field, index) => {
            return (
              <div className='flex flex-col gap-1'>
                <input 
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  className='border-b border-white/50 py-2 px-2 rounded-t-xl text-sm text-white placeholder:text-white/70 placeholder:opacity-80 focus:outline-none focus:border-white transition duration-200'
                />
              </div>
            )
          })
        }

        <button className='cursor-pointer w-full mt-5 bg-mainRed/90 rounded-full py-3 text-lg font-normal flex items-center justify-center gap-1 hover:gap-2 transition-all duration-200'
        onClick={handleNext}>
            Next <span><IoIosArrowForward /></span>
        </button>
      </form>
    </div>
  )
}

export default AddressDetails