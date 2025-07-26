import React from 'react'
import ScrollVelocity from '../ScrollVelocity'
import { FaInstagram } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

import { LuTwitter } from "react-icons/lu";
import { FaTwitter } from "react-icons/fa";

import { CiFacebook } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import Button from '../../common/Button';
import { routeConstant } from '../../../constants/RouteConstants';

const HeroSection = () => {
  return (
    <div className='max-h-screen mt-[16vh]'>
        <ScrollVelocity texts={['Original american']} velocity={90} className="text-[80px] md:text-[140px] font-roboto_serif uppercase font-thin text-black"/>

        <div className='relative -translate-y-15 flex justify-center xl:justify-between items-end w-full h-[74vh] sm:h-[38rem]'>

                <div className='hidden xl:flex flex-col gap-2'>
                    <p className='uppercase font-roboto font-medium'>Follow us on</p>

                    <div className='flex gap-6 items-center text-3xl text-black'>
                        <a href="https://www.instagram.com/eatatyorktown?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <AiFillInstagram className='hover:text-customOrange transition-all duration-100 cursor-pointer'/>
                        </a>

                        {/* <FaTwitter  className='hover:text-customOrange transition-all duration-100 cursor-pointer'/> */}

                        <a href="" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FaFacebook  className='hover:text-customOrange transition-all duration-100 cursor-pointer'/>
                        </a>
                    </div>
                </div>
                
                <div className='absolute left-1/2 transform -translate-x-1/2 top-0 h-[60%] xl:h-[100%]'>
                    <img src="/MainPizza.png" alt="PizzaImg" className="h-full w-auto object-contain" loading="lazy" />
                </div>

                <div className='xl:w-[300px] flex flex-col gap-5'>
                    <p className='text-center xl:text-end text-sm font-roboto font-light text-black'>
                        Craving your favorite dish? At YorkTown, we bring the 
                        best of our kitchen straight to your doorstep. No long waits, 
                        no confusion — just great food, delivered how you like it. 
                        Browse, order, and enjoy — it's that simple. Because good food should always be fast, fresh, and satisfying.
                    </p>

                    <div className='flex justify-center xl:justify-end gap-4'>
                        <Button text={"Deliver at home"} path={"/coming-soon"}/>
                        <Button text={"Take away"} path={routeConstant.MENU}/>
                    </div>
                </div>
            {/* <div className='flex items-end justify-between border'>
            </div> */}
        </div>
    </div>
  )
}

export default HeroSection