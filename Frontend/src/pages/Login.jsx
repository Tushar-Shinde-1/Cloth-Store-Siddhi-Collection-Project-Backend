import React, { useState } from 'react'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      {/* Header */}
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {/* Show Name only for Sign Up */}
      {currentState === 'Sign Up' && (
        <input
          type="text"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Name'
          required
        />
      )}

      <input
        type="email"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
        required
      />
      <input
        type="password"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Password'
        required
      />

      {/* Forgot Password */}
      {currentState === 'Login' && (
        <p className='cursor-pointer text-sm text-blue-600 w-full text-right'>
          Forgot Your Password?
        </p>
      )}

      {/* Toggle Sign Up / Login */}
      <p
        className='cursor-pointer text-sm text-gray-700'
        onClick={() =>
          setCurrentState(currentState === 'Sign Up' ? 'Login' : 'Sign Up')
        }
      >
        {currentState === 'Sign Up'
          ? 'Already have an account? Login'
          : "Don’t have an account? Sign Up"}
      </p>

      {/* Dynamic Submit Button */}
      <button
     
        className="bg-black text-white font-light px-8 py-2 mt-4"
      >
        {currentState}
      </button>
    </form>
  )
}

export default Login
