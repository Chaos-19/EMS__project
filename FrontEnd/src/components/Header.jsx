import React from 'react'
import { Link } from 'react-router-dom'
import { IoSearchSharp } from 'react-icons/io5'

export default function Header() {
  return (
    <header>
        <div className='bg-gray-95000 rounded-br-badge shadow-lg flex items-center justify-between gap-4 p-7'>
          <div className='text-3xl font-semibold font-mono'>
          <h1 
          className='bg-gradient-to-r
           from-white via-blue-300
           to-indigo-600 inline-block 
           text-transparent bg-clip-text'>
            EMS
            <span>SMU</span>
            </h1>
          </div>
          <div>
            <form className='flex gap-2 items-center'>
              <input type="text" placeholder='Search for an event'
              id="search" 
              className='w-full input input-accent h-10 rounded-full
              hover:bg-white focus:bg-white
               text-black text-lg' />
            
              <button type="submit" 
              className='btn btn-circle bg-yellow-700
               text-white'>
                <IoSearchSharp className='w-7 h-7 outline-none sm:w-24'/>
              </button>
            </form>
          </div>
          <div className='font-semibold text-base text-gray-50 hidden sm:inline'>
            <ul className='flex gap-4 '>
              <Link to='/'>
                  <li 
                    className='hover:text-yellow-700'>
                    Home
                  </li>
              </Link>
              <li className='hover:text-yellow-700'>Categories</li>
              <li className='hover:text-yellow-700'>Services</li>
              <li className='hover:text-yellow-700'>About Us</li>
            </ul>
          </div>
          <Link to='/login' >
          <div className='flex-nowrap'>
            <button 
            className='btn btn-ghost w-200
             uppercase hover:text-yellow-700'>
              LogIn
            </button>
          </div>
            </Link>
        </div>
    </header>
  )
}
