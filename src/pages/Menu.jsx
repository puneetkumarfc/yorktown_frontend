import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { quickPickCategories, quickPickItems } from '../constants/Home';
import { VscSettings } from "react-icons/vsc";
import {filters} from "../constants/Menu"
import ItemCard from '../components/common/ItemCard';
import FilterModal from '../components/menu/FilterModal';

const Menu = () => {

  const [query, setQuery] = useState('');
  const [filterModal, setFilterModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Submarines');
  const [selectedFilters, setSelectedFilters] = useState([]);
  
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
  };

  const setCategory = (category) => {
    setActiveCategory(category);
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
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-mainRed/80 hover:text-mainRed transition-colors cursor-pointer">
                <RxCross2 className="w-6 h-6" />
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
        <div className='flex gap-3 flex-wrap'>
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
      </div>

      <div className='w-full flex flex-wrap gap-5 justify-between mt-10 font-poppins'>
          {
              quickPickItems.map((item) => (
                  <ItemCard id={item.id} name={item.name} img={item.img} desc={item.desc} priceFrom={item.priceFrom}/>
              ))
          }
          {
              quickPickItems.map((item) => (
                  <ItemCard id={item.id} name={item.name} img={item.img} desc={item.desc} priceFrom={item.priceFrom}/>
              ))
          }
      </div>
    </div>
  )
}

export default Menu