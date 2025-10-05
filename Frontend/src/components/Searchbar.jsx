import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const Searchbar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('/collection')) {
      setVisible(true); 
    } else {
      setVisible(false);  
    }
  }, [location]);

  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 py-2 px-2 flex items-center justify-center gap-2'>
      
      {/* Search Box */}
      <div className='flex items-center border border-gray-400 px-3 py-2 rounded-full w-full sm:w-3/4 md:w-1/2'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 outline-none bg-inherit text-sm px-2'
          type="text"
          placeholder='Search'
        />
        <img src={assets.search_icon} className='w-6 sm:w-7 md:w-8 ml-2' alt="Search" />
      </div>

      {/* Cancel Button */}
      <img
        src={assets.cancel}
        className='w-5 cursor-pointer'
        onClick={() => setShowSearch(false)}
        alt="Close"
      />
    </div>
  ) : null;
}

export default Searchbar;
