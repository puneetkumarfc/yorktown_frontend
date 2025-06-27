import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";

const Bag = () => {
  const [query, setQuery] = useState('');
  
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className='h-screen'>
      <div className="relative mt-25">
        <p className='text-center mb-6 font-archivo uppercase font-semibold'>Your <span className='text-mainRed'>favorite food </span> is just a click away!</p>
        <div className="relative flex items-center">
          <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mainRed w-6 h-6" />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
            placeholder="Search for food..."
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainRed/70 focus:border-transparent shadow-sm text-white"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Bag