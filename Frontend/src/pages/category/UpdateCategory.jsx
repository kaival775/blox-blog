import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useState } from "react";
import addCategoryValidator from "../../validators/addCategoryValidator";

const initialFormData = {
  title: "",
  desc: "",
};
const initialFormError = {
  title: "",
  desc: "",
};

const UpdateCategory = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const categoryId = params.id;

  useEffect(() => {
    if (categoryId) {
      const getCategories = async () => {
        try {
          const response = await axios.get(`/category/${categoryId}`);
          const data = response.data.data;
          setFormData({title: data.category.title, desc: data.category.desc})
        } catch (error) {
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: true,
          });
        }
      };
      getCategories();
    }
  }, [categoryId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = addCategoryValidator({ title: formData.title });
    if (errors.title) {
      setFormError(errors);
    } else {
      try {
        setLoading(true)
        const response = await axios.put(`/category/${categoryId}`, formData);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: true,
        });
        setLoading(false);
        navigate("/category");
      } catch (error) {
        setLoading(false)
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-black transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Go Back
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Update Category</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Category Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter category title"
            />
            {formError.title && (
              <p className="error-text mt-1">{formError.title}</p>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-2">
              Category Description
            </label>
            <textarea
              id="desc"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              rows={4}
              className="input-field resize-none"
              placeholder="Enter category description (optional)"
            />
          </div>
          
          <div className="flex items-center justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => navigate("/category")}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "Updating Category..." : "Update Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateCategory