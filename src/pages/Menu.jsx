import React, { useEffect, useState, useRef } from 'react'
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { quickPickCategories, quickPickItems } from '../constants/Home';
import { VscSettings } from "react-icons/vsc";
import {filters} from "../constants/Menu"
import ItemCard from '../components/common/ItemCard';
import FilterModal from '../components/menu/FilterModal';
import { fetchCategories, fetchMenu } from '../services/operations/menu';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useLoader } from '../components/common/LoaderContext';

const Menu = () => {

  const [query, setQuery] = useState('');
  const [filterModal, setFilterModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [menu, setMenu] = useState([]);
  
  const { showLoader, hideLoader } = useLoader();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
  };

  const setCategory = (category) => {
    setActiveCategory(category);
    setMenu([]); // Clear menu before fetching new items
    displayMenu(category.id, 2);
  }

  const displayFilterModal = () => {
    setFilterModal(!filterModal);
  }

  const toggleFilters = (filters) => {
    setSelectedFilters(prev => prev.includes(filters) ? prev.filter(id => id !== filters) : [...prev, filters])
  }

  const clearAllFilters = () => {
    setSelectedFilters([]);
  }

  const displayCategories = async(displayHome=2) => {
    showLoader();
    try {
        const response = await fetchCategories(displayHome);
        setCategories(response.data.data);
        if (response.data.data.length > 0) {
          setActiveCategory(response.data.data[0]);
          displayMenu(response.data.data[0].id, 2);
        }
    } catch (error) {
        console.log(error);
    } finally {
        hideLoader();
    }
  }

  const displayMenu = async (categoryId, displayHome = 2) => {
    showLoader();
    try {
      const response = await fetchMenu(categoryId, displayHome);
      setMenu(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      hideLoader();
    }
  }

  useEffect(() => {
      displayCategories();
  }, [])

  return (
    <div className='min-h-screen mb-10 overflow-hidden'>

      {/* Heading, searchbar, filter */}
      <div className="relative mt-25">
        {/* Heading */}
        <p className='text-center mb-6 font-archivo uppercase font-semibold'>Your <span className='text-customBeige'>favorite food </span> is just a click away!</p>
        
        <div className='flex items-center gap-2'>
          {/* Searchbar */}
          <div className="relative flex items-center w-full">
            <IoIosSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white w-9 h-9 transition-colors p-2 bg-customOrange rounded-full cursor-pointer" />
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
              placeholder="Search anything"
              className="w-full px-13 py-3 bg-mainBg placeholder:text-black/50 placeholder:font-light placeholder:text-sm rounded-full border-2 border-black/10 focus:outline-none focus:border-black text-black"
              autoComplete="off"
            />
            {query && (
              <button type="button"
                onClick={handleClear}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black hover:text-black/40 transition-colors cursor-pointer">
                <RxCross2 className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Filter */}
          <div className='relative'>
            <VscSettings strokeWidth={1} onClick={displayFilterModal} 
            className='text-xl rotate-90 text-customOrange hover:text-customOrange/70 transition-all duration-200 cursor-pointer'/>
            {
              filterModal && (<FilterModal selectedFilters={selectedFilters} clearAllFilters={clearAllFilters} toggleFilters={toggleFilters}/>)
            }
          </div>
        </div>
      </div>
      
      {/* Categories */}
      <div className='mt-4 flex items-center gap-3'>
        <p className='font-poppins text-sm'>Categories: </p>
        <div className='flex gap-2 overflow-auto'>
         {categories.map((category, index) => {
              const isActive = activeCategory.name === `${category.name}`;
              return (
                <div
                  key={index}
                  className={`flex justify-center text-nowrap py-2 px-4 ${isActive ? "bg-mainRed/80 text-white" : "bg-mainRed/30 hover:bg-mainRed/50 text-white/80"} transition-all duration-200 rounded-full text-sm cursor-pointer shadow-md border border-mainRed/30 hover:border-mainRed/80`}
                  onClick={() => setCategory(category)}>
                  {category.name}
                </div>
              );
            })}
        </div>
      </div>

      <div className='w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-10 font-poppins'>
          {
            menu.map((menuItem, index) => {
              return (
                <ItemCard key={index} id={menuItem.id} name={menuItem.name} img={menuItem.imageUrl || menuItem.img} desc={menuItem.desc} priceFrom={menuItem.startingPrice}/>
              )
            })
          }
      </div>
    </div>
  )
}

export default Menu