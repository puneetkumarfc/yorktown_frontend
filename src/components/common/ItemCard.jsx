import React, { useState } from 'react'
import CustomizeModal from './CustomizeModal';

const ItemCard = ({id, name, img, desc, priceFrom}) => {

    const [displayModal, setDisplayModal] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    const showModal = () => {
        setDisplayModal(!displayModal);
    }

  return (
    <div className='rounded-md w-full flex flex-col items-center gap-0 border border-black/10 overflow-hidden'>
        <div className='w-full flex justify-center relative'>
            {!imageLoaded && (
                <div className="w-full h-[120px] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-400 bg-opacity-40 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden animate-pulse-slow" style={{opacity: 0.4}}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src="/pizza.png" alt="Pizza icon" className="w-8 h-8 opacity-80" />
                  </div>
                  <div className="absolute inset-0 shimmer" />
                </div>
            )}
            <img
                src={img}
                className={`w-full h-[120px] object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                alt={name}
            />
        </div>

        <div className='flex flex-col w-full items-center justify-between px-4 py-2 h-full'>
            <p className='text-center'>{name}</p>
            <p className='text-center text-sm font-light text-white/70 mt-1 mb-3'>{desc}</p>

            <div className='flex w-full justify-between items-end'>
                <div className='flex flex-col items-start'>
                    <p className='text-sm text-mainRed'>From</p>
                    <p>{priceFrom.toFixed(2)}$</p>
                </div>

                <div className='text-customOrange text-xs rounded-full cursor-pointer hover:underline'
                onClick={showModal}>
                    Customize
                </div>
            </div>
        </div>

        {
            displayModal && <CustomizeModal id={id} name={name} img={"/ShrimpBg.jpg"} desc={desc} priceFrom={priceFrom} showModal={showModal}/>
        }
    </div>
  )
}

export default ItemCard