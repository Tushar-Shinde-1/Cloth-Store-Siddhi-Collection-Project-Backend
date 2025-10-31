import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      console.log(response)
      setList(response.data.products)
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch products")
      console.log(error)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])


  const removeProduct=async(id)=>
  {
    try {
      const response =await axios.post(backendUrl+'/api/product/remove',{id},{headers:{token}})
      if(response.data.success)
      {
        toast.success(response.data.message)
        await fetchList();
       
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }
  return (
    <div className='w-full min-h-screen p-6 bg-white shadow-sm'>
      <p className='text-xl font-semibold mb-5 text-gray-800'>🛍️ All Products</p>

      {/* Table Header */}
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-10 bg-gray-100 py-3 px-6 rounded-t-md font-semibold border-b text-gray-700'>
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p className='text-center'>Action</p>
      </div>

      {/* Product List */}
      <div className='flex flex-col divide-y divide-gray-200'>
        {list.length === 0 ? (
          <p className='text-center py-6 text-gray-500'>No products available</p>
        ) : (
          list.map((item, index) => (
            <div
              key={index}
              className='grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-10 grid-cols-2 md:items-center items-start py-5 px-6 hover:bg-gray-50 transition-all duration-200'
            >
              {/* Image */}
              <div className='flex justify-center md:justify-start'>
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className='w-20 h-20 object-cover rounded-md border border-gray-300'
                />
              </div>

              {/* Name */}
              <p className='font-medium text-gray-800'>{item.name}</p>

              {/* Category */}
              <p className='text-gray-600'>{item.category}</p>

              {/* Price */}
              <p className='text-gray-700 font-semibold'>
                {currency}{item.price}
              </p>

              {/* Action */}
              <div className='flex justify-center'>
                <button
                  className='text-red-500 hover:text-red-700 font-bold text-lg'
                  onClick={() => removeProduct(item._id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default List
