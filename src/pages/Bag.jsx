import React, { useState } from 'react'
import useCartStore from '../hooks/useCartStore';
import { FiMinus } from "react-icons/fi";
import { FiPlus } from 'react-icons/fi';

const Bag = () => {

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total
  } = useCartStore();

  console.log(cart);

  return (
    <div className="relative flex min-h-screen">
      {/* Left padded content */}
      <div className="flex-1 px-6 mt-25">
        <p className='uppercase font-archivo font-semibold'>Your<span className='text-mainRed'> food</span> bag</p>

        <div className='flex flex-col gap-3 mt-10'>
          {
            cart.map((item, index) => (
              <div key={index} className='flex items-center border border-white/20 rounded-xl'>
                <div className='w-1/5 min-w-[200px] rounded-l-xl'>
                  <img className='rounded-l-xl object-cover' src={item.image} />
                </div>

                <div className="flex justify-between items-center p-4 w-full">
                  <div className='flex flex-col items-start'>
                    <p className="font-archivo text-xl">{item.name}</p>
                    <p className="font-poppins text-sm text-white/70"><span className="text-mainRed">$</span>{item.price}</p>
                  </div>

                  <div className='flex flex-col items-center gap-1'>
                    <button className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-mainYellow/80 hover:text-mainYellow/80 transition-colors">
                      <FiMinus className="w-4 h-4" />
                    </button>
                    <p>{item.quantity}</p>
                    <button className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-mainYellow/80 hover:text-mainYellow/80 transition-colors">
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* Sticky sidebar that ignores page padding */}
      <div className="sticky top-0 self-start min-w-[400px] h-screen bg-mainYellow/50">
        {/* Sidebar content here */}
      </div>
    </div>
  )
}

export default Bag