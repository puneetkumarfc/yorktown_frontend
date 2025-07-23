import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const Searchbar = () => {

    const [query, setQuery] = useState("");
    const handleInputChange = (e) => setQuery(e.target.value);
    const handleClear = () => setQuery("");

  return (
    <div className="relative flex items-center w-full">
        <IoSearchOutline className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black/20 w-5 h-5 transition-colors" />
        <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter"}
            placeholder="Search"
            className="w-full py-2 px-8 border border-black/20 placeholder:text-black/30 rounded-xl focus:outline-none focus:border-black/50 text-black"
            autoComplete="off"
        />
        {query && (
            <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black/20 hover:text-black/50 hover:text-mainRed transition-colors cursor-pointer"
            >
            <RxCross2 className="w-5 h-5" />
            </button>
        )}
    </div>
  )
}

export default Searchbar