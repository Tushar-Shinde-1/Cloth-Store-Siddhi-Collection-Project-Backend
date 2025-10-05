import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {
  //we use this hookto get the product id 
  const{productId}=useParams();
  const{products,currency,addToCart}=useContext(ShopContext);
  const[productData,setProductData]=useState(false);
  const[image,setImage]=useState('')
  const [size,setSize]=useState('');
  const fetchProductData=async()=>
  {
    products.map((item)=>
    {
      if(item._id===productId)
      {
        setProductData(item);
        setImage(item.image[0])
        console.log(item);
      }
      return null;
    })
  }

  useEffect(()=>{
fetchProductData();
  },[productId])
  return productData ?(
<div className='mx-4 sm:mx-[82px]'>
  <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
    <div className='flex flex-col sm:flex-row gap-6 sm:gap-12'>

      {/* Product images */}
      <div className='w-full sm:w-[58%] flex flex-col sm:flex-row gap-3 sm:gap-2'>
        
        {/* Sub Images */}
        <div className='flex flex-row sm:flex-col w-full sm:w-[18.7%] h-[100px] sm:h-[500px] overflow-x-auto sm:overflow-y-auto'>
          {productData.image.map((item, index) => (
            <div
              key={index}
              className='w-1/4 sm:w-full h-full sm:h-1/4 mb-3 flex-shrink-0'
            >
              <img
                onClick={() => setImage(item)}
                src={item}
                className='w-full h-full object-cover cursor-pointer'
                alt=""
              />
            </div>
          ))}
        </div>

        {/* Main Image */}
        <div className='w-full sm:w-[80%] h-[300px] sm:h-[500px]'>
          <img
            className='w-full h-full object-cover'
            src={image}
            alt=""
          />
        </div>
      </div>

      {/* Product info */}
      <div className='w-full sm:w-[48%] flex-1'>
        <h1 className='font-medium text-xl sm:text-2xl mt-2'>{productData.name}</h1>
        <div className='flex items-center gap-1 mt-2'>
          <img src={assets.rating} alt="" className="w-4 sm:w-5" />
          <img src={assets.rating} alt="" className="w-4 sm:w-5" />
          <img src={assets.rating} alt="" className="w-4 sm:w-5" />
          <img src={assets.rating} alt="" className="w-4 sm:w-5" />
          <img src={assets.nonrating} alt="" className="w-4 sm:w-5" />
          <p className='pl-2 text-sm'>(122)</p>
        </div>
        <p className='mt-5 text-2xl sm:text-3xl font-medium'>{currency}{productData.price}</p>
        <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

        <div className='flex flex-col gap-4 my-8'>
          <p>Select Size</p>
          <div className='flex gap-2 flex-wrap'>
            {productData.sizes.map((item,index)=>(
              <button
                onClick={()=>setSize(item)}
                key={index}
                className={`border py-2 px-4 bg-gray-100 ${item===size?'border-orange-500':''}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 w-full sm:w-auto'>ADD TO CART</button>
        <hr className='mt-8 sm:w-4/5'/>
        <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
          <p>100% original product</p>
          <p>100% original product</p>
        </div>
      </div>
    </div>

    {/* Description */}
    <div className='mt-10 sm:mt-10'>
      <div className='flex flex-col sm:flex-row'>
        <b className='border px-5 py-3 text-sm'>Description</b>
        <p className='border px-5 py-3 text-sm'>Reviews(122)</p>
      </div>
      <div className='flex flex-col gap-4 border mt-2 px-6 py-6 text-sm text-gray-500 mb-0'>
        <p>hjgyugygygvgvevevbvvghdvvfuivvreuivveuivvgfuivvejiv vjuhvuihuhfhv vjkhwiouwevn vweijwe vuiwehweuvhwev jibhwejve vuiwevweenvwhv wevbn</p>
        <p>ruivrguigbegbfrgfbrrrihrirwjnb jkdhwefuiwefhweuifweghfwekfhweuifwefuefuideeuffhfhf</p>
      </div>
    </div>

    {/* Related Products */}
    <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>
  </div>
</div>


  ):<div className='opacity-0'></div>
}

export default Product
