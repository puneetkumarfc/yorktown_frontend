import React, { useState } from 'react'
import { quickPickCategories, quickPickItems } from '../../../constants/Home'
import Button from '../../common/Button'
import { routeConstant } from '../../../constants/RouteConstants'
import ItemCard from '../../common/ItemCard'

const QuickPick = () => {

    const [activeCategory, setActiveCategory] = useState('Submarines');

    const setCategory = (category) => {
        setActiveCategory(category);
    }

  return (
    <div className='flex flex-col items-center mt-12 mb-20'>
        <p className='uppercase font-archivo font-semibold'><span className='text-mainRed'>Quick</span> Picks</p>
        <p className='text-white/70 font-poppins font-light mt-1'>Out most popular items ready for quick customization</p>

        <div className='flex gap-3 mt-4'>
            {
                quickPickCategories.map((category) => {
                    const isActive = activeCategory === `${category.name}`;
                    return (
                        <div className={`py-2 px-4 ${isActive ? "bg-mainRed/80" : "bg-mainRed/30 hover:bg-mainRed/50"} transition-all duration-200 rounded-full font-archivo text-sm cursor-pointer`}
                        onClick={() => setCategory(category.name)}>
                            {category.name}
                        </div>
                    )
                })
            }
        </div>

        <div className='w-full flex justify-between my-6 font-poppins'>
            {
                quickPickItems.map((item, index) => (
                    <ItemCard key={index} id={item.id} name={item.name} img={item.img} desc={item.desc} priceFrom={item.priceFrom}/>
                ))
            }
        </div>

        <Button text={"Explore full menu"} path={routeConstant.MENU}/>
    </div>
  )
}

export default QuickPick