import React, { useState } from 'react'
import signupValidator from '../validators/signupValidator'
import axios from '../utils/axiosInstance'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'

const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const initialError = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData)
  const [error, setError] = useState(initialError)
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = signupValidator({formData})
    if (errors.name || errors.email || errors.password || errors.confirmPassword) {
      setError(errors)
    } else {
      const requestBody = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };
      try {
        setLoading(true)
        const response = await axios.post("/auth/signup", requestBody);
        console.log(response)
        toast.success(response.data.message, {position: "top-right"})
        setLoading(false)
        navigate("/login")
        setError(initialError)
        setFormData(initialFormData)
      } catch (error) {
        toast.error(error.response.data.message, {position: "top-right", autoclose: true})
        setLoading(false)
        console.log(error.message)
      }
    }
  }
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-600 mt-2">Join us today</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your full name"
              />
              {error.name && (
                <p className="error-text mt-1">{error.name}</p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your email"
              />
              {error.email && (
                <p className="error-text mt-1">{error.email}</p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                placeholder="Create a password"
              />
              {error.password && (
                <p className="error-text mt-1">{error.password}</p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-field"
                placeholder="Confirm your password"
              />
              {error.confirmPassword && (
                <p className="error-text mt-1">{error.confirmPassword}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-black font-medium hover:text-gray-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Signup