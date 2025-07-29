import React, { useEffect, useState, useRef } from 'react'
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { quickPickCategories, quickPickItems } from '../constants/Home';
import { VscSettings } from "react-icons/vsc";
import {filters} from "../constants/Menu"
import ItemCard from '../components/common/ItemCard';
import FilterModal from '../components/menu/FilterModal';
import { fetchCategories, fetchCategoriesCopy, fetchMenu } from '../services/operations/menu';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useLoader } from '../components/common/LoaderContext';

const Menu = () => {

  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [activeCategory, setActiveCategory] = useState('');
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
      const response = await fetchCategoriesCopy(categoryId, displayHome);
      const transformedData = response.data.data || {};
      setSubCategories(transformedData);
    } catch (error) {
      setSubCategories({}); // Clear on error
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
        <p className='text-center mb-6 font-roboto uppercase font-semibold'>Your favorite food is just a click away!</p>
        
        <div className='flex items-center gap-2'>
          {/* Searchbar */}
          <div className="relative flex items-center w-full">
            <IoIosSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white w-9 h-9 transition-colors p-2 bg-customOrange hover:bg-customOrange/80 rounded-full cursor-pointer" />
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
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
        </div>
      </div>
      
      {/* Categories */}
      <div className='mt-6 flex items-center gap-4'>
        <p className='font-roboto text-sm font-semibold text-black/80 flex-shrink-0'>Categories:</p>
        <div className='flex gap-3 overflow-x-auto pb-2 no-scrollbar'>
         {categories.map((category) => {
              const isActive = activeCategory.id === category.id;
              return (
                <button
                  key={category.id}
                  className={`flex-shrink-0 whitespace-nowrap py-2 px-3 rounded-full text-xs font-normal transition-all duration-200 cursor-pointer focus:outline-none ${
                    isActive
                      ? "bg-customOrange text-white"
                      : "bg-mainBg text-customOrange border border-customOrange/40 hover:bg-customOrange/5"
                  }`}
                  onClick={() => setCategory(category)}>
                  {category.name}
                </button>
              );
            })}
        </div>
      </div>

      {/* Filtered Menu Items */}
      <div className='w-full mt-10 flex flex-col gap-10'>
        {Object.keys(subCategories).map((categoryName) => (
          <div key={categoryName} className='flex flex-col gap-1'>
            <p className='font-semibold mb-2'>{categoryName}</p>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {subCategories[categoryName]
                .filter(menuItem => menuItem.name.toLowerCase().includes(query.toLowerCase()))
                .map(menuItem => (
                  <ItemCard
                    key={`${categoryName}-${menuItem.id}`}
                    id={menuItem.id}
                    name={menuItem.name}
                    img={menuItem.imageUrl || menuItem.img}
                    desc={menuItem.desc}
                    priceFrom={menuItem.startingPrice}
                  />
                ))}
            </div>
          </div>
        ))}
        {/* No results message */}
        {Object.keys(subCategories).every(categoryName =>
          subCategories[categoryName].filter(menuItem =>
            menuItem.name.toLowerCase().includes(query.toLowerCase())
          ).length === 0
        ) && query && (
          <div className="col-span-full text-center py-16 flex flex-col items-center animate-fade-in-simple">
            <IoIosSearch className="text-5xl text-customOrange/70 mb-4" />
            <h3 className="text-lg font-roboto_serif font-semibold text-black/80">No Results Found</h3>
            <p className="text-black/50 text-sm mt-1 font-roboto font-light">We couldn't find any items matching "{query}".</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Menu