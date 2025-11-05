import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import TItle from './TItle';
import ProductItem from './ProductItem';

const RelatedProduct = ({category,subCategory}) => {
    const {products}=useContext(ShopContext);
    const [related,setRelated]=useState([]);
    useEffect(()=>
    {
        if(products.length>0)
        {
            let productsCopy=products.slice();
            console.log(category);
            console.log(subCategory);
            productsCopy=productsCopy.filter((item)=>category===item.category)
            productsCopy=productsCopy.filter((item)=>subCategory===item.subCategory)
          setRelated(productsCopy.slice(0,5));
        }
    },[products]);
    console.log("relateed",related)

    
  return (
    <div>
      <div className='my-6'>
        <div className='text-center text-3xl py-2'>
            <TItle text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>
        <div className='flex flex-wrap justify-center gap-x-2 gap-y-4 mt-4'>
  {related.map((item, index) => (
    <div
      key={index}
      onClick={() => {
        // Update current product in context or parent
        // Example: setCurrentProduct(item) if you have context
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <ProductItem
        id={item._id}
        image={item.image}
        name={item.name}
        price={item.price}
      />
    </div>
  ))}
</div>

      </div>
    </div>
  )
}

export default RelatedProduct
