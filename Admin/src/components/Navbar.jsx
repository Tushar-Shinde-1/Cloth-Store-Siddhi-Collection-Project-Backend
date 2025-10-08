import React from 'react'
import {assets} from '../assets/assets'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='flex  items-center py-2 px-[4%] justify-between'>
    
    <div className="storename p-2 ">Siddhi Collection </div>
      <button className='bg-gray-600 text-white  px-5 py-2 sm:py-2 rounded-full text-xs sm:text:sm'>Logout</button>
    </div>
  )
}

export default Navbar
