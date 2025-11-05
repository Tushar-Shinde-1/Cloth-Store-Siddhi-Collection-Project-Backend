import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      setList(response.data.products)
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch products")
      console.log(error)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 bg-white shadow-sm">
      <p className="text-xl font-semibold mb-5 text-gray-800">🛍️ All Products</p>

      {/* Table Header (Hidden on Mobile) */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-10 bg-gray-100 py-3 px-6 rounded-t-md font-semibold border-b text-gray-700">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p className="text-center">Action</p>
      </div>

      {/* Product List */}
      <div className="flex flex-col divide-y divide-gray-200">
        {list.length === 0 ? (
          <p className="text-center py-6 text-gray-500">No products available</p>
        ) : (
          list.map((item, index) => (
            <div
              key={index}
              className="grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 md:gap-10 items-center py-4 px-4 sm:px-6 hover:bg-gray-50 transition-all duration-200 rounded-lg"
            >
              {/* Image */}
             {/* Image */}
<div className="flex justify-center md:justify-start">
  <img
    src={item.image[0]}
    alt={item.name}
    className="w-32 h-32 sm:w-36 sm:h-36 md:w-20 md:h-20 object-cover rounded-lg border border-gray-300 shadow-sm"
  />
</div>


              {/* Mobile View Card Info */}
              <div className="flex flex-col sm:hidden">
              <div className="flex-1 text-center md:text-left">
  <h3 className="text-lg font-semibold">{item.name}</h3>
  <p className="text-gray-600">{currency}{item.price}</p>
  <p className="text-gray-600">Category: {item.category}</p>

  
</div>

{/* Remove Button */}
<button className="bg-red-500 text-white text-sm px-1 py-2 my-2 rounded hover:bg-red-600 transition">
  Remove
</button>

              </div>

              {/* Desktop View Info */}
              <p className="hidden md:block font-medium text-gray-800">{item.name}</p>
              <p className="hidden md:block text-gray-600">{item.category}</p>
              <p className="hidden md:block text-gray-700 font-semibold">
                {currency}{item.price}
              </p>
              <div className="hidden md:flex justify-center">
                <button
                  className="text-red-500 hover:text-red-700 font-bold text-lg"
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
