import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id,image,name,price}) => {
    const{currency}=useContext(ShopContext);


  return (
    
    <Link to ={`/product/${id}`} className='text-gray-700 cursor-pointer'>
      
      <div className='overflow-hidden w-40 h-40 md:w-60 md:h-60'>
  <img
    className='hover:scale-110 transition ease-in-out duration-300 w-full h-full object-cover'
    src={image[0]}
    alt=""
  />
</div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
