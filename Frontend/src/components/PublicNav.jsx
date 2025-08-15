import React from 'react'
import { NavLink } from 'react-router-dom'

const PublicNav = () => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-black">Blog</h1>
          </div>
          <div className="flex space-x-4">
            <NavLink 
              to='/login'
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'bg-black text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              Login
            </NavLink>
            <NavLink 
              to='/signup'
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'bg-black text-white' 
                    : 'text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`
              }
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default PublicNav