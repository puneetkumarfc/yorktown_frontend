import React, { useEffect, useState } from 'react'
import { quickPickCategories, quickPickItems } from '../../../constants/Home'
import Button from '../../common/Button'
import { routeConstant } from '../../../constants/RouteConstants'
import ItemCard from '../../common/ItemCard'
import { fetchCategories, fetchMenu } from '../../../services/operations/menu'
import { useLoader } from '../../common/LoaderContext'

const QuickPick = () => {

    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');
    const [menu, setMenu] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [loadingMenu, setLoadingMenu] = useState(false);

    const { showLoader, hideLoader } = useLoader();

    const setCategory = (category) => {
        setActiveCategory(category);
        displayMenu(category.id, 1);
    }

    const displayCategories = async(displayHome=1) => {
        setLoadingCategories(true);
        showLoader();
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
            hideLoader();
        }
    }

    const displayMenu = async(categoryId, displayHome=1) => {
        setMenu([]); // Clear menu before fetching
        setLoadingMenu(true);
        showLoader();
        try {
            const response = await fetchMenu(categoryId, displayHome);
            const items = Array.isArray(response.data.data) ? response.data.data : [];
            setMenu(items);
        } catch (error) {
            setMenu([]); // Clear on error
            console.log(error);
        } finally {
            setLoadingMenu(false);
            hideLoader();
        }
    }

    useEffect(() => {
        displayCategories();
    }, [])

  return (
    <div className='flex flex-col items-center mt-12 mb-20 relative'>
        <p className='uppercase font-roboto font-medium'>Quick Picks</p>
        <p className='text-black/70 font-roboto text-sm font-light mt-1 text-center'>Our most popular items ready for quick customization</p>

        <div className='w-full flex justify-start sm:justify-center gap-2 mt-4 overflow-x-auto no-scrollbar'>
            {
                categories.map((category, index) => {
                    const isActive = activeCategory.name === `${category.name}`;
                    return (
                        <div key={index} className={`flex-shrink-0 whitespace-nowrap py-2 px-3 rounded-full text-xs font-normal transition-all duration-200 cursor-pointer focus:outline-none ${
                            isActive
                            ? "bg-customOrange text-white"
                            : "bg-mainBg text-customOrange border border-customOrange/40 hover:bg-customOrange/5"
                        }`}
                        onClick={() => setCategory(category)}>
                            {category.name}
                        </div>
                    )
                })
            }
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 my-6 gap-4 w-full'>
            {
                (
                    menu.map((menuItem, index) => {
                        return (
                            <ItemCard key={index} id={menuItem.id} name={menuItem.name} img={menuItem.imageUrl || menuItem.img} desc={menuItem.desc} priceFrom={menuItem.startingPrice}/>
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