import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import TItle from './TItle';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter(item => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);
  console.log(bestSeller);

  return (
    <div>
      <div className='my-10'>
        <div className='text-center text-3xl py-8'>
          <TItle text1='Best' text2='Sellers' />
          <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            bjewgiy jfqwiufkqgwfuqw fqwjkfbqwfuobwfoqw quobqwiqwodbc
          </p>
        </div>
        <div className='flex flex-wrap justify-center gap-x-2 gap-y-4'>
          {bestSeller.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;