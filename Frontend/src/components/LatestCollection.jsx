import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import TItle from './TItle'
import ProductItem from './ProductItem'

const LatestCollection = () => {

    const {products}=useContext(ShopContext)
    //console.log(products)
    const [latestProduct,setLatestProduct]=useState([]);
    useEffect(()=>{
setLatestProduct(products.slice(0,5));
    },[])
    
    //console.log(latestProduct)
  return (
    <div className='my-4 sm:my-10 md:my-10'>
        <div className='text-center py-8 text-3xl'>
        <TItle text1={'Latest'} text2={'Collection'}/>
        
        </div>

{/* rendering the product */}


<div className='flex flex-wrap justify-center gap-x-8 gap-y-4 mt-4'>
  {
    latestProduct.map((item, index) =>
      <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
    )
  }
</div>
{/* <ProductItem/> */}
    </div>
  )
}

export default LatestCollection
