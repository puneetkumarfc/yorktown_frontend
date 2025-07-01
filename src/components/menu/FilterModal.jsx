import React from "react";
import { filters } from "../../constants/Menu";


const FilterModal = ({selectedFilters, clearAllFilters, toggleFilters}) => {
  return (
    <div className="absolute top-10 rounded-xl right-0 w-fit bg-[#1a1a1a] py-4 px-6">
      <p className="text-lg font-semibold text-center">Filters</p>

      {/* Filters */}
      <div className="py-2">
        <>
          {filters.map((filter, index) => (
            <div key={index} className="mb-3 w-full">
              <p className="text-medium mb-3">{filter.name}</p>
              <div className="flex gap-3 w-full">
                {filter.list.map((item, ind) => (
                  <div key={ind} className="flex gap-2 items-center">
                    <button
                      key={item.id}
                      onClick={() => toggleFilters(item.item)}
                      className={`p-3 w-auto rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                        selectedFilters.includes(item.item)
                          ? "border-mainRed/70 bg-red-50 text-mainRed"
                          : "border-white/20 hover:border-gray-300 text-white"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-light text-sm font-poppins text-nowrap">
                          {item.item}
                        </span>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 items-center justify-center">
        <button
          className="text-nowrap text-sm bg-transparent hover:bg-mainYellow/70 
                        transition-all duration-200 border border-mainYellow/70 hover:border-transparent text-mainYellow
                        hover:text-white cursor-pointer p-3 rounded-xl">
          Apply Filters
        </button>
        <button
          className="text-nowrap text-sm bg-transparent hover:bg-mainRed/70 
                        transition-all duration-200 border border-mainRed/70 hover:border-transparent text-mainRed
                        hover:text-white cursor-pointer p-3 rounded-xl"
          onClick={clearAllFilters}>
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
