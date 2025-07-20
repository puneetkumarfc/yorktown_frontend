import React, { useLayoutEffect, useRef } from 'react'
import SpotlightCard from '../SpotlightCard'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { features } from '../../../constants/Home';

const FeaturesSection = () => {

  return (
    <section className="relative mb-20">
      <p className='font-roboto font-medium uppercase text-center pb-5'>What separates us?</p>
        <div className="w-full flex flex-wrap justify-center gap-6">
          {
            features.map((feature, index) => (
                <div key={index} className=" rounded-lg p-4 flex flex-col items-center min-w-[220px] max-w-[250px]">
                    <div className='h-[80px] w-[80px] flex items-center justify-center mb-2'>
                        <img src={feature.image} alt={feature.heading} className="h-full w-full object-contain opacity-70" />
                    </div>
                    <p className='font-roboto text-black font-medium text-center'>{feature.heading}</p>
                    <p className='text-black/60 font-light font-roboto text-sm text-center'>{feature.desc}</p>
                </div>
            ))
          }
        </div>
    </section>
  )
}

export default FeaturesSection