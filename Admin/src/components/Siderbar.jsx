import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Siderbar = () => {
  return (
    <div className="w-full md:w-1/5 md:min-h-screen border-gray-200 md:border-r-2 bg-white">
      <div className="flex flex-row md:flex-col justify-around md:justify-start gap-2 md:gap-4 pt-3 md:pt-6 px-2 md:px-6 text-[15px]">

        <NavLink 
          className="flex items-center gap-2 md:gap-3 border border-gray-300 md:border-r-0 px-3 py-2 rounded hover:bg-gray-100"
          to="/add"
        >
          <img className="w-5 h-5 pr-1" src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>

        <NavLink 
          className="flex items-center gap-2 md:gap-3 border border-gray-300 md:border-r-0 px-3 py-2 rounded hover:bg-gray-100"
          to="/list"
        >
          <img className="w-5 h-5 pr-1" src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>

        <NavLink 
          className="flex items-center gap-2 md:gap-3 border border-gray-300 md:border-r-0 px-3 py-2 rounded hover:bg-gray-100"
          to="/orders"
        >
          <img className="w-5 h-5 pr-1" src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Siderbar
