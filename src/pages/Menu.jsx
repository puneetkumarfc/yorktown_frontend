import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { quickPickCategories, quickPickItems } from '../constants/Home';
import { VscSettings } from "react-icons/vsc";
import {filters} from "../constants/Menu"
import ItemCard from '../components/home/ItemCard';

const Menu = () => {

  const [query, setQuery] = useState('');
    const [filterModal, setFilterModal] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Submarines');
    const [selectedFilters, setSelectedFilters] = useState([]);
  
    console.log(selectedFilters)
    
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
            <IoIosSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-mainYellow/90 w-6 h-6 transition-colors" />
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
              placeholder="Search pizza"
              className="w-full px-13 py-3 border-[1px] border-mainYellow/70 placeholder:text-white/70 rounded-full focus:outline-none text-white"
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
          <div className='p-2 bg-mainYellow/30 rounded-md cursor-pointer relative'>
            <VscSettings onClick={displayFilterModal} 
            className='text-xl rotate-90 text-white hover:text-mainYellow transition-all duration-200'/>
            {
              filterModal && (
                <div className='absolute top-10 border border-white/50 rounded-lg right-0 w-[300px] bg-white/5 backdrop-blur-md'>
                  <p className='py-3 px-3 border-b border-white/50 text-md uppercase'>Filters</p>

                  {/* Filters */}
                  <div className='py-2 px-2'>
                    <>
                      {
                        filters.map((filter, index) => (
                          <div key={index} className=''>
                            <p className='text-medium py-1'>{filter.name}</p>
                            <div className='flex flex-col gap-1 px-3 '>
                              {
                                filter.list.map((item, ind) => (
                                  <div key={ind} className='flex gap-2 items-center'>
                                    <input
                                      type="checkbox"
                                      id={item.id}
                                      className="appearance-none w-4 h-4 p-1 rounded-full border border-white/70 checked:bg-mainYellow transition-colors duration-100 cursor-pointer"
                                      checked={selectedFilters.includes(item.item)}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setSelectedFilters((prev) => [...prev, item.item]);
                                        } else {
                                          setSelectedFilters((prev) => prev.filter((fid) => fid !== item.item));
                                        }
                                      }}
                                    />
                                    <label htmlFor={item.id} className="text-white/70 cursor-pointer w-full bg-transparent hover:bg-white/10 rounded-md px-1 text-sm">{item.item}</label>
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                        ))
                      }
                    </>
                  </div>
                  
                  {/* Buttons */}
                  <div className='py-3 px-2 border-t border-white/50 flex gap-2 items-center justify-center'>
                    <button className='text-nowrap text-sm bg-transparent hover:bg-mainYellow/70 
                    transition-all duration-200 border border-mainYellow/70 hover:border-transparent text-mainYellow
                    hover:text-white cursor-pointer py-2 px-2 rounded-md'>Apply Filters</button>
                    <button className='text-nowrap text-sm bg-transparent hover:bg-mainRed/70 
                    transition-all duration-200 border border-mainRed/70 hover:border-transparent text-mainRed
                    hover:text-white cursor-pointer py-2 px-2 rounded-md'
                    onClick={clearAllFilters}>Clear All</button>
                  </div>
                </div>
              )
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
                  <ItemCard name={item.name} img={item.img} desc={item.desc} priceFrom={item.priceFrom}/>
              ))
          }
          {
              quickPickItems.map((item) => (
                  <ItemCard name={item.name} img={item.img} desc={item.desc} priceFrom={item.priceFrom}/>
              ))
          }
      </div>
    </div>
  )
}

export default Menu