import React, { useState } from 'react'
import axios from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import signinValidator from '../validators/signinValidator';

const initialFormData = {
  email: "",
  password: "",
};
const initialError = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData)
  const [error, setError] = useState(initialError)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = signinValidator(formData);
    if (errors.email || errors.password) {
      setError(errors)
    } else {
      try {
        setLoading(true)
        const response = await axios.post("/auth/signin", formData);
        setLoading(false);
        console.log('Login response:', response.data);
        toast.success(response.data.message, {position: "top-right", autoClose: true});
        window.localStorage.setItem("blog-data", JSON.stringify(response.data.data))
        console.log('Stored data:', JSON.stringify(response.data.data));
        window.location.href = "/"
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message, {position: "top-right", autoClose: true});
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter your password"
              />
              {error.password && (
                <p className="error-text mt-1">{error.password}</p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <Link 
                to="/forgot-password" 
                className="text-sm text-black hover:text-gray-700 font-medium"
              >
                Forgot Password?
              </Link>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-black font-medium hover:text-gray-700">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login