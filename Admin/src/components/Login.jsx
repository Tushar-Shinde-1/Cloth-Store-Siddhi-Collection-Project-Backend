import React, { useState } from 'react'
import { backendUrl } from '../App'
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // prevent reload
  
    try {
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
  
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      // this handles wrong credentials or server errors
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Invalid credentials";
      toast.error(message);
    }
  };
  
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Admin Panel</h1>

        <form  onSubmit={onSubmitHandler} className="space-y-5">
          <div className="min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
            <input  onChange={(e)=>setEmail(e.target.value)} value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              type="password"
              placeholder="Enter your Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
