import React, { useEffect, useState } from 'react'
import { quickPickCategories, quickPickItems } from '../../../constants/Home'
import Button from '../../common/Button'
import { routeConstant } from '../../../constants/RouteConstants'
import ItemCard from '../../common/ItemCard'
import { fetchCategories, fetchMenu } from '../../../services/operations/menu'
import PizzaLoader from '../../common/PizzaLoader';

const QuickPick = () => {

    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');
    const [menu, setMenu] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [loadingMenu, setLoadingMenu] = useState(false);

    const setCategory = (category) => {
        setActiveCategory(category);
        displayMenu(category.id, 1);
    }

    const displayCategories = async(displayHome=1) => {
        setLoadingCategories(true);
        try {
            const response = await fetchCategories(displayHome);
            setCategories(response.data.data);
            if (response.data.data.length > 0) {
                setActiveCategory(response.data.data[0]);
                displayMenu(response.data.data[0].id, 1);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingCategories(false);
        }
    }

    const displayMenu = async(categoryId, displayHome=1) => {
        setMenu([]); // Clear menu before fetching
        setLoadingMenu(true);
        try {
            const response = await fetchMenu(categoryId, displayHome);
            const items = Array.isArray(response.data.data) ? response.data.data : [];
            setMenu(items);
        } catch (error) {
            setMenu([]); // Clear on error
            console.log(error);
        } finally {
            setLoadingMenu(false);
        }
    }

    useEffect(() => {
        displayCategories();
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
                        <div key={index} className={`flex justify-center text-nowrap py-2 px-4 ${isActive ? "bg-mainRed/80 text-white" : "bg-mainRed/30 hover:bg-mainRed/50 text-white/80"} transition-all duration-200 rounded-full text-sm cursor-pointer shadow-md border border-mainRed/30 hover:border-mainRed/80`}
                        onClick={() => setCategory(category)}>
                            {category.name}
                        </div>
                    )
                })
            }
        </div>

        <div className='w-full flex flex-wrap justify-between my-6 font-poppins'>
            {
                (loadingCategories || loadingMenu) ? (
                    <PizzaLoader loading={true} size={90} />
                ) : (
                    menu.map((menuItem, index) => {
                        return (
                            <ItemCard key={index} id={menuItem.id} name={menuItem.name} img={menuItem.img} desc={menuItem.desc} priceFrom={menuItem.startingPrice}/>
                        )
                    })
                )
            }
        </div>

        <Button text={"Explore full menu"} path={routeConstant.MENU}/>
    </div>
  )
}

export default QuickPick