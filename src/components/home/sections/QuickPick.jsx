import React, { useEffect, useState } from 'react'
import { quickPickCategories, quickPickItems } from '../../../constants/Home'
import Button from '../../common/Button'
import { routeConstant } from '../../../constants/RouteConstants'
import ItemCard from '../../common/ItemCard'
import { fetchCategories, fetchMenu } from '../../../services/operations/menu'

const QuickPick = () => {

    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');
    const [menu, setMenu] = useState([]);

    const setCategory = (category) => {
        setActiveCategory(category);
    }

    const displayCategories = async(displayHome=2) => {
        try {
            const response = await fetchCategories(displayHome);
            console.log(response.data.data)
            setCategories(response.data.data);
            if (response.data.data.length > 0) {
                setActiveCategory(response.data.data[0]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const displayMenu = async(displayHome=2) => {
        try {
            const response = await fetchMenu(displayHome);
            console.log(response.data.data)
            setMenu(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        displayCategories();
        displayMenu();
    }, [])

    console.log(activeCategory)
    console.log(menu)

  return (
    <div className='flex flex-col items-center mt-12 mb-20'>
        <p className='uppercase font-archivo font-semibold'><span className='text-mainRed'>Quick</span> Picks</p>
        <p className='text-white/70 font-poppins font-light mt-1'>Out most popular items ready for quick customization</p>

        <div className='flex gap-3 mt-4 flex-wrap'>
            {
                categories.map((category, index) => {
                    const isActive = activeCategory.name === `${category.name}`;
                    return (
                        <div key={index} className={`text-nowrap py-2 px-4 ${isActive ? "bg-mainRed/80" : "bg-mainRed/30 hover:bg-mainRed/50"} transition-all duration-200 rounded-full font-archivo text-sm cursor-pointer`}
                        onClick={() => setCategory(category)}>
                            {category.name}
                        </div>
                    )
                })
            }
        </div>

        <div className='w-full flex flex-wrap justify-between my-6 font-poppins'>
            {
                menu.filter(item => item.categoryId == activeCategory.id).map((menuItem, index) => {
                    return (
                        <ItemCard key={index} id={menuItem.id} name={menuItem.name} img={menuItem.img} desc={menuItem.desc} priceFrom={menuItem.startingPrice}/>
                    )
                })
            }
        </div>

        <Button text={"Explore full menu"} path={routeConstant.MENU}/>
    </div>
  )
}

export default QuickPick