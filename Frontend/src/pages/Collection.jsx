import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import TItle from '../components/TItle';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const {products ,search,showSearch}=useContext(ShopContext);
  const [showFilter,setShowFilter]= useState(false);
  const [filterProducts,setFilterProducts]=useState([]);
  const [category,setCategory]=useState([]);
  const [subcategory,setSubCategory]=useState([]);
  const [sortType,setSortType]=useState("relavent");

  //toggle the category
  const toggle=(e)=>{
    if(category.includes(e.target.value)) {
      setCategory(prev=>prev.filter(item=>item!=e.target.value))
    } else {
      setCategory(prev=>[...prev,e.target.value])
    }
  }

  //toggling the subscategory
  const togglesubCategory=(e)=>{
    if(subcategory.includes(e.target.value)) {
      setSubCategory(prev=>prev.filter(item=>item!=e.target.value))
    } else {
      setSubCategory(prev=>[...prev,e.target.value])
    }
  }

  const applyFilter =()=>{
    console.log("i am called");
    let productscopy=products.slice();

    //search filter
    if(showSearch&&search){
      productscopy=productscopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }

    //category filter
    if(category.length>0){
      productscopy=productscopy.filter(item=>category.includes(item.category));
    }

    //subcategory filter
    if(subcategory.length>0){
      productscopy=productscopy.filter(item=>subcategory.includes(item.subCategory));
    }

    console.log("updated prodects",productscopy);
    setFilterProducts(productscopy)
  }

  const sortProduct=()=>{
    let fpcopy=filterProducts.slice();
    switch(sortType){
      case 'low-high':
        setFilterProducts(fpcopy.sort((a,b)=>a.price-b.price))
        break;
      case 'high-low':
        setFilterProducts(fpcopy.sort((a,b)=>b.price-a.price)) 
        break 
      default:
        applyFilter(); //no sorting, just filtered
    }
  }

  //apply filter when category, subcategory, search or showSearch changes
  useEffect(()=>{applyFilter(); },[products, category,subcategory,search,showSearch])
  //sort product when sortType changes
  useEffect(()=>{sortProduct()},[sortType])

  console.log(filterProducts)
  useEffect(()=>{console.log(category)},[category])
  useEffect(()=>{console.log(subcategory)},[subcategory])

  return (
    <div className='flex flex-col sm:flex-row gap-5 md:gap-10 pt-3 md:pt-10 px-1 md:px-12 border-t'>
      {/* //filteroptions */}
      <div className='min-w-60'> 
        <p onClick={() => setShowFilter(!showFilter)}  className='my-0 md:text-xl flex items-center cursor-pointer pl-6 gap-2  md:my-2 md:pl-1 '>FILTERS
          {/* //add dropdoen icon here */}
          <img src={assets.filter} alt="" className={` h-4 pt-1 sm:hidden ${showFilter?'rotate-180':''}`}/>
        </p>

        {/* category filter  here we are creating the dynamic styling which will update with stae variable so we have used the backtik in the below class name */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6  mx-3  md:mx-0  ${showFilter ? '':'hidden'} sm:block`} >
          <p className='mb-3 text-sm font-medium '>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700 '>
            <p className='flex gap-2'>
              <input className='w-3 'type='checkbox' value={'Women'} onChange={toggle}/>Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3 'type='checkbox' value={'Kids'} onChange={toggle}/>Kids
            </p>
          </div>
        </div>

        {/* subcategory of filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 mx-3 md:mx-0 ${showFilter ? '':'hidden'} sm:block`} >
          <p className='mb-3 text-sm font-medium '>Type</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3 'type='checkbox' value={'Daily'} onChange={togglesubCategory}/>Daily
            </p>
            <p className='flex gap-2'>
              <input className='w-3 'type='checkbox' value={'Occassional'} onChange={togglesubCategory}/>Occasional
            </p>
            <p className='flex gap-2'>
              <input className='w-3 'type='checkbox' value={'Wedding'} onChange={togglesubCategory}/>Wedding
            </p>
          </div>
        </div>
      </div>

      {/* rightportion */}
      <div className='flex-1  px-1 md:px-6 sm:px-12 md:py-4'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <TItle  text1={"ALL"} text2={"COLLECTION"}/>
          {/* SORT PRODUCT */}
          <select  onChange={(e)=>setSortType(e.target.value)} className='border border-gray-300 text-sm px-0 pl-2'>
            <option value="relavent">Sort by:Relavent</option>
            <option value="low-high">Sort by:Low to High</option>
            <option value="high-low">Sort by:High to Low</option>
          </select>
        </div>

        {/* map product */}
        <div className='flex flex-wrap justify-center gap-x-8 gap-y-4 mt-4'>
          {
            filterProducts.map((item, index) =>
              <ProductItem 
                key={index} 
                id={item._id} 
                image={item.image} 
                name={item.name} 
                price={item.price} 
              />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
