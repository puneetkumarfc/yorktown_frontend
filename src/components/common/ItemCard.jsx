import React, { useState } from 'react'
import CustomizeModal from './CustomizeModal';

const ItemCard = ({id, name, img, desc, priceFrom}) => {

    const [displayModal, setDisplayModal] = useState(null);

    const showModal = () => {
        setDisplayModal(!displayModal);
    }

  return (
    <div className='rounded-md w-[18%] flex flex-col items-center gap-0'>
        <div className='w-full'>
            <img src={img} className=''/>
        </div>

        <div className='flex flex-col w-full items-center justify-between px-4 py-2 h-full'>
            <p className='text-center'>{name}</p>
            <p className='text-center text-sm font-light text-white/70 mt-1 mb-3'>{desc}</p>

            <div className='flex w-full justify-between items-end'>
                <div className='flex flex-col items-start'>
                    <p className='text-sm text-mainRed'>From</p>
                    <p>{priceFrom.toFixed(2)}$</p>
                </div>

                <div className='text-mainYellow/50 hover:text-mainYellow text-xs rounded-full cursor-pointer hover:underline'
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