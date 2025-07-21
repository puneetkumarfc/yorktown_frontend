import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { IoIosArrowForward } from "react-icons/io";

const AddressDetails = ({handleNext}) => {

  const {register, handleSubmit, formState: { errors }} = useForm();
  const [orderType, setOrderType] = useState("takeaway")
  const [schedulingOption, setSchedulingOption] = useState("Order Now")
  const [scheduleModal, setScheduleModal] = useState(false);

  const toggleModal = () => {
    setScheduleModal(!scheduleModal);
  }

  return (
    <div className='flex flex-col items-center gap-2'>
      <p className='text-xl font-poppins font-bold uppercase text-center'>Choose an option</p>
      <p className='text-sm text-black/70 text-center'>Choose an option below to select your delivery method</p>

      <div className='w-fit flex items-center gap-4 py-1 px-1 mt-2 rounded-full border border-black/50'>
        <p className={`${orderType === "delivery" ? "bg-white text-black" : "text-black/50 hover:bg-white/20"} cursor-pointer font-normal  h-full px-3 py-3 rounded-full`}
        onClick={() => setOrderType("delivery")}>Home Delivery</p>
        <p className={`${orderType === "takeaway" ? "bg-white text-black" : "text-black/50 hover:bg-white/20"} cursor-pointer font-normal  h-full px-3 py-3 rounded-full`}
        onClick={() => setOrderType("takeaway")}>Takeaway</p>
      </div>

      <div className='w-full'>
        {
          orderType === "delivery" ? 
          <>
            {/* <p className='mb-2 text-xl font-poppins font-bold uppercase text-center'>Enter Your Address</p>
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
            </form> */}
             <p className='text-center mt-20'>Coming Soon!</p>
          </> :
          <>
            <form className='flex flex-col gap-6 mt-5' onSubmit={handleSubmit(handleNext)}>
              <div className='flex flex-col gap-1'>
                <textarea placeholder="Do you have any message for us? (Optional)" rows={5} {...register("orderNotes")}
                  className='border border-black/50 p-4 rounded-xl w-full placeholder:text-black/50 placeholder:text-sm focus:outline-none focus:border-white transition duration-200'
                />
              </div>

              <button className='cursor-pointer w-full bg-mainRed/90 text-white rounded-full py-3 text-lg font-normal flex items-center justify-center gap-1 hover:gap-2 transition-all duration-200'
              value="submit" type='submit'>
                Next <span><IoIosArrowForward /></span>
              </button>
            </form>
          </>
        }
      </div>
    </div>
  )
}

export default AddressDetails