import React from 'react'
import ScrollVelocity from '../ScrollVelocity'
import { FaInstagram } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

import { LuTwitter } from "react-icons/lu";
import { FaTwitter } from "react-icons/fa";

import { CiFacebook } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import Button from '../../common/Button';

const HeroSection = () => {
  return (
    <div className='max-h-screen mt-[16vh]'>
        <ScrollVelocity texts={['Original american']} velocity={90} className="text-[140px] uppercase font-black text-mainYellow/20"/>

        <div className='relative -translate-y-15 flex justify-between items-end w-full h-[582px]'>

                <div className='flex flex-col gap-2'>
                    <p className='uppercase font-archivo font-semibold'><span className='text-mainRed'>Follow</span> us on</p>

                    <div className='flex gap-6 items-center text-3xl text-white'>
                        <AiFillInstagram className='hover:text-mainYellow/80 transition-all duration-100 cursor-pointer'/>

                        <FaTwitter  className='hover:text-mainYellow/80 transition-all duration-100 cursor-pointer'/>

                        <FaFacebook  className='hover:text-mainYellow/80 transition-all duration-100 cursor-pointer'/>
                    </div>
                </div>
                
                <div className='absolute left-1/2 transform -translate-x-1/2 top-0'>
                    <img src="/MainPizza.png" alt="PizzaImg" width={582} />
                </div>

                <div className='w-[300px] flex flex-col gap-5'>
                    <p className='text-end font-poppins font-light text-white/70'>
                        Craving your favorite dish? At YorkTown, we bring the 
                        best of our kitchen straight to your doorstep. No long waits, 
                        no confusion — just great food, delivered how you like it. 
                        Browse, order, and enjoy — it's that simple. Because good food should always be fast, fresh, and satisfying.
                    </p>

                    <div className='flex justify-end gap-4'>
                        <Button text={"Deliver at home"}/>
                        <Button text={"Take away"}/>
                    </div>
                </div>
            {/* <div className='flex items-end justify-between border'>
            </div> */}
        </div>
    </div>
  )
}

export default HeroSection