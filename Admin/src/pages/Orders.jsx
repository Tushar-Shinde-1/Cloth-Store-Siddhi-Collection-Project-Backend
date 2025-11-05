import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllorders = async () => {
    if (!token) return null
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllorders()
  }, [token])

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      )
      if (response.data.success) {
        await fetchAllorders()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 text-center md:text-left">
        Order Management
      </h3>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Scrollable on mobile */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
            <thead className="bg-gray-100 hidden md:table-header-group">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Customer Info
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Order Info
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>

            {/* Mobile friendly cards */}
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="block md:table-row border md:border-0 mb-4 md:mb-0 rounded-lg md:rounded-none shadow-sm md:shadow-none p-4 md:p-0"
                >
                  <td className="px-4 py-3 md:px-6 md:py-4 block md:table-cell">
                    <div className="flex items-start space-x-3">
                      <img
                        src={assets.parcel_icon}
                        alt="Order"
                        className="w-8 h-8 mt-1"
                      />
                      <div>
                        <div className="font-medium text-gray-900 mb-2">Items:</div>
                        <div className="text-gray-600">
                          {order.items.map((item, i) => (
                            <span key={i}>
                              {item.name} x {item.quantity}
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">
                                {item.size}
                              </span>
                              {i < order.items.length - 1 && ', '}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 md:px-6 md:py-4 block md:table-cell">
                    <div className="text-sm">
                      <p className="text-gray-900 font-medium">
                        {order.address.firstName + ' ' + order.address.lastName}
                      </p>
                      <p className="text-gray-600 text-xs mt-1">{order.address.street}</p>
                      <p className="text-gray-600 text-xs">
                        {order.address.city}, {order.address.state}, {order.address.country},{' '}
                        {order.address.zipcode}
                      </p>
                      <p className="text-gray-600 text-xs mt-1">📞 {order.address.phone}</p>
                    </div>
                  </td>

                  <td className="px-4 py-3 md:px-6 md:py-4 block md:table-cell">
                    <div className="text-sm text-gray-900 space-y-1">
                      <p>
                        <span className="font-medium">Items:</span> {order.items.length}
                      </p>
                      <p>
                        <span className="font-medium">Method:</span> {order.paymentMethod}
                      </p>
                      <p>
                        <span className="font-medium">Payment:</span>
                        <span
                          className={`ml-1 px-2 py-1 text-xs rounded-full ${
                            order.payment
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {order.payment ? 'Done' : 'Pending'}
                        </span>
                      </p>
                      <p>
                        <span className="font-medium">Date:</span>{' '}
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-3 md:px-6 md:py-4 block md:table-cell">
                    <div className="text-sm font-semibold text-gray-900">
                      {currency}:{order.amount}
                    </div>
                  </td>

                  <td className="px-4 py-3 md:px-6 md:py-4 block md:table-cell">
                    <select
                      value={order.status}
                      onChange={(event) => statusHandler(event, order._id)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="text-center py-12">
            <img
              src={assets.parcel_icon}
              alt="No orders"
              className="w-16 h-16 mx-auto mb-4 opacity-40"
            />
            <p className="text-gray-500 text-lg">No orders found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
