import React from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateNav = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.removeItem("blog-data")
    toast.success("Log out successful", {position: "top-right", autoClose: true})
    navigate("login")
  }

  const auth = useAuth();
  
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-black">Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-1">
            <NavLink 
              to="/"
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'bg-black text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              Home
            </NavLink>
            
            {(auth.role === 1 || auth.role === 2) && (
              <NavLink 
                to="category"
                className={({ isActive }) => 
                  `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'bg-black text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                Category
              </NavLink>
            )}
            
            <NavLink 
              to="posts"
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'bg-black text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              Posts
            </NavLink>
            
            <NavLink 
              to="profile"
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'bg-black text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              Profile
            </NavLink>
            
            <NavLink 
              to="setting"
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'bg-black text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              Settings
            </NavLink>
            
            <button 
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors duration-200 ml-2"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default PrivateNav