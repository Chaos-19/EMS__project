import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto mt-7'>
      <div className='w-96 p-6 rounded-lg shadow-lg bg-white bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5'>
      <h1 className='text-3xl font-semibold text-center text-yellow-700 uppercase'>Login</h1>
      <form>
      <div>
          <label className='label p-2'>
            <span className='text-base font-semibold label-text'>Username</span>
          </label>
          <input type="text" 
          placeholder='Enter Username'
          className='w-full input input-bordered h-10 focus:bg-white focus:text-black' />
        </div>
        <div>
          <label className='label p-2'>
            <span className='text-base font-semibold label-text'>Password</span>
          </label>
          <input type="password" 
          placeholder='Enter Password'
          className='w-full input input-bordered h-10 focus:bg-white focus:text-black' />
        </div>
        <Link to='/signup'>
        <span className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>{"Don't"} have an account?</span>
        </Link>
        <div>
          <button className='btn btn-block bg-yellow-700 text-gray-900 mt-2 font-semibold text-lg uppercase hover:text-yellow-700'>
            Login
          </button>
        </div>
      </form>
      </div>
    </div>
  )
}
