import React, { useState, useEffect } from "react";
import profileValidator from "../validators/profileValidator";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  name: "",
  email: "",
};

const initialError = {
  name: "",
  email: "",
};

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(initialError);
  const [loading, setLoading] = useState(false);
  const [oldEmail, setOldEmail] = useState(null)
  
  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/auth/current-user`);
        const data = response.data.data.user;
        setFormData(data)
        setOldEmail(data.email)
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    };
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = profileValidator({ formData });
    if (errors.name || errors.email) {
      setError(errors);
    } else {
      const requestBody = {
        name: formData.name,
        email: formData.email,
      };
      try {
        setLoading(true);
        const response = await axios.put("/auth/update-user", requestBody);
        toast.success(response.data.message, { position: "top-right" });
        setLoading(false);
        setError(initialError);
        if (oldEmail != formData.email) {
          window.localStorage.removeItem("blog-data")
          navigate("/login");
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoclose: true,
        });
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Update your personal information</p>
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
            {oldEmail !== formData.email && formData.email && (
              <p className="text-amber-600 text-sm mt-1">
                ⚠️ Changing your email will require you to log in again
              </p>
            )}
          </div>
          
          <div className="flex items-center justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "Updating Profile..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile