import React from 'react'

const ItemCard = ({name, img, desc, priceFrom}) => {
  return (
    <div className='rounded-md w-[18%]'>
        <div className='w-full'>
            <img src={img} className=''/>
        </div>
        <div className='flex flex-col w-full items-center px-4 py-2'>
            <p>{name}</p>
            <p className='text-center text-sm text-white/70 mt-1 mb-3'>{desc}</p>

            <div className='flex w-full justify-between items-end'>
                <div className='flex flex-col items-start'>
                    <p className='text-sm text-mainRed'>From</p>
                    <p>{priceFrom}</p>
                </div>

                <div className='text-mainYellow/50 hover:text-mainYellow text-xs rounded-full cursor-pointer hover:underline'>
                    Customize
                </div>
            </div>
        </div>
    </div>
  )
}

export default ItemCard