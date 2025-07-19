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
    <div className='min-h-screen mb-10'>

      {/* Heading, searchbar, filter */}
      <div className="relative mt-25">
        {/* Heading */}
        <p className='text-center mb-6 font-archivo uppercase font-semibold'>Your <span className='text-mainYellow/90'>favorite food </span> is just a click away!</p>
        
        <div className='flex items-center gap-2'>
          {/* Searchbar */}
          <div className="relative flex items-center w-full">
            <IoIosSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#C4C7C5] w-9 h-9 transition-colors p-2 bg-secondary hover:bg-primary rounded-full cursor-pointer" />
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
              placeholder="Search anything"
              className="w-full px-13 py-3 bg-secondary placeholder:text-white/40 placeholder:font-light placeholder:text-sm rounded-full focus:outline-none focus:border-white/50 text-white"
              autoComplete="off"
            />
            {query && (
              <button type="button"
                onClick={handleClear}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#C4C7C5] hover:text-white transition-colors cursor-pointer">
                <RxCross2 className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Filter */}
          <div className='relative'>
            <VscSettings onClick={displayFilterModal} 
            className='text-xl rotate-90 text-white hover:text-mainYellow transition-all duration-200 cursor-pointer'/>
            {
              filterModal && (<FilterModal selectedFilters={selectedFilters} clearAllFilters={clearAllFilters} toggleFilters={toggleFilters}/>)
            }
          </div>
        </div>
      </div>
      
      {/* Categories */}
      <div className='mt-4 flex items-center gap-3'>
        <p className='font-poppins text-sm'>Categories: </p>
        <div className='w-full'>
          <Carousel
            additionalTransfrom={0}
            arrows={true}
            autoPlay={false}
            centerMode={false}
            className="category-carousel"
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite={false}
            itemClass="carousel-item-padding-40-px"
            keyBoardControl
            minimumTouchDrag={40}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 7 },
              desktop: { breakpoint: { max: 1200, min: 900 }, items: 5 },
              tablet: { breakpoint: { max: 900, min: 600 }, items: 3 },
              mobile: { breakpoint: { max: 600, min: 0 }, items: 2 }
            }}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {categories.map((category, index) => {
              const isActive = activeCategory.name === `${category.name}`;
              return (
                <div
                  key={index}
                  className={`text-nowrap py-2 px-4 mx-2 ${isActive ? "bg-mainRed/80 text-white" : "bg-mainRed/30 hover:bg-mainRed/50 text-white/80"} transition-all duration-200 rounded-full text-sm cursor-pointer shadow-md border border-mainRed/30 hover:border-mainRed/80`}
                  onClick={() => setCategory(category)}
                  style={{ minWidth: 110, textAlign: 'center' }}
                >
                  {category.name}
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>

      <div className='w-full flex flex-wrap gap-5 mt-10 font-poppins'>
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