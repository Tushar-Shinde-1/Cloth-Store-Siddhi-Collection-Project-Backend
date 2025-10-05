import React, { useContext, useState } from 'react'
import './Navbar.css'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'




const Navbar = () => {
    const [visible,setVisible]=useState(false);
    const {setShowSearch,getCartCount}=useContext(ShopContext);
    return (
<div className='shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] 
                flex items-center justify-between 
                py-2 px-4 sm:py-2 sm:px-5 md:py-2 md:px-8 font-medium sha'>


       <Link to='/'>
        <div className="storename p-2 ">Siddhi Collection</div>
        </Link>

        <ul className=' hovereffect  hidden sm:flex gap-8 text-sm text-gray-700 sm:gap-3 md:gap-6'>
            <NavLink to='/' className=' flex flex-col items-center gap-1'>
                <p>HOME</p>
            </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                <p>COLLECTION</p>
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>ABOUT</p>
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p>CONTACT</p>
            </NavLink>
           

        </ul>
        <div className='flex items-center gap-4'>
            <img onClick={()=>{setShowSearch(true)}} src={assets.search_icon} alt=""  className='w-5 cursor-pointer sm:w-4 md:w-5' />
            <div className='group relative'>
                <Link to='/login'>
            <img src={assets.profile_icon} alt="" className='w-6 cursor-pointer sm:w-5 md:w-6' />
            </Link> 
            <div className='group-hover:block hidden absolute drowpdown-menu right-0 pt-4'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                    <p className='cursor-pointer hover:text-black'>My Profile</p>
                    <p className='cursor-pointer hover:text-black'>Order</p>
                    <p className='cursor-pointer hover:text-black'>Logout</p>
                </div>
            </div>
            </div>
        <Link to='cart' className='relative'>
        <img src={assets.addcart} className='w-5 sm:w-2 md:w-5 min-w-4' alt="" />
        <p className='absolute right-[-5px] bottom-[-5px] w-4 h-4 flex items-center justify-center bg-black text-white text-xs rounded-full'>
        {getCartCount()}
       </p>
        </Link>
        <img onClick={()=>setVisible(true)} src={assets.menu}  className='w-5 cursor-pointer sm:w-3 md:w-4 sm:hidden' alt="" />
        </div>
        {

            //sidebar menu for small screen with  dynamic class
            <div className={` absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible?'w-full':'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={()=>setVisible(false)} className='flex item-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.back1} className='h-4 mt-1' alt="" />
                        <p>Back</p>

                    </div>
                    <NavLink onClick={()=>setVisible(false)} className='py-4 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-4 pl-6 border' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-4 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-4 pl-6 border' to='/contact'>CONTACT</NavLink>
                   


                </div>
 
            </div>

        }
       
        
      </div>

     
      
   
  )
}

export default Navbar
