import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { quickPickCategories, quickPickItems } from '../constants/Home';
import { VscSettings } from "react-icons/vsc";
import {filters} from "../constants/Menu"
import ItemCard from '../components/home/ItemCard';

const Bag = () => {

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
    <div className='h-screen'>Bag</div>
  )
}

export default Bag