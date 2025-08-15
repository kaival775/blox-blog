import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import moment from 'moment/moment';

const CategoryList = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState([])
  const [pageSize, setPageSize] = useState(5)
  const [searchValue, setSearchValue] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [categoryId, setCategoryId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `/category?page=${currentPage}&size=${pageSize}&q=${searchValue}`
        );
        const data = response.data.data;
        setCategories(data.categories);

        console.log(data.categories);
        setTotalPage(data.pages)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toast.error(error.response.data.message, {position: "top-right", autoClose: true});
      }
    }
    getCategories()
  }, [currentPage, searchValue]);

  useEffect(() => {
    if (totalPage > 1) {
      let tempPageCount = []
      for (let i = 1; i <= totalPage; i++) {
        tempPageCount = [...tempPageCount, i];
      }
      setPageCount(tempPageCount)
    } else {
      setPageCount([])
    }
  }, [totalPage])

  const handlePage = (pageNum) => {
    setCurrentPage(pageNum)
  }
  
  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1)
  }

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const handleSearch = async (e) => {
    try {
      const input = e.target.value;
      setSearchValue(input)
    } catch (error) {
      const response = error.response;
      const data = response.data;
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: true,
      });
    }
  }

  const handleDelete = async () => {
    try {
      setShowModal(false);
      const response = await axios.delete(`/category/${categoryId}`);
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: true,
      });
      setLoading(true);
      const response2 = await axios.get(
        `/category?page=${currentPage}&size=${pageSize}&q=${searchValue}`
      );
      const data = response2.data.data;
      setCategories(data.categories);
      setTotalPage(data.pages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: true,
      });
    }
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <button 
          onClick={() => navigate("new-category")}
          className="btn-primary flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Category
        </button>
      </div>
      
      <div className="mb-6">
        <div className="relative max-w-md">
          <input 
            type="search" 
            placeholder="Search categories..." 
            name="search" 
            onChange={handleSearch}
            className="search-field pl-10 w-full"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          <span className="ml-3 text-gray-600">Loading categories...</span>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Created</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Updated</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{category.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{category.desc}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {moment(category.createdAt).format("MMM DD, YYYY")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {moment(category.updatedAt).format("MMM DD, YYYY")}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`update-category/${category._id}`)}
                          className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors duration-200"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => {setShowModal(true); setCategoryId(category._id)}}
                          className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {categories.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No categories found</p>
          <button 
            onClick={() => navigate("new-category")}
            className="btn-primary mt-4"
          >
            Create Your First Category
          </button>
        </div>
      )}
      
      {pageCount.length > 0 && (
        <div className="flex items-center justify-center space-x-2 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Previous
          </button>
          
          <div className="flex space-x-1">
            {pageCount.map((pageNum, index) => (
              <button
                key={index}
                onClick={() => handlePage(pageNum)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  currentPage === pageNum
                    ? 'bg-black text-white'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleNext}
            disabled={currentPage === totalPage}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Next
          </button>
        </div>
      )}
      
      {/* Custom Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this category? This action cannot be undone.</p>
            <div className="flex space-x-3 justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                  setCategoryId(null);
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryList