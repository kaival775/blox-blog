import React, { useEffect, useState } from 'react'
import img from '../../assets/images/vite.svg'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from '../../utils/axiosInstance'

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/posts/my-posts?page=${currentPage}&size=${pageSize}&q=${searchValue}`
        );
        const data = response.data.data;
        
        setPosts(data.posts);
        setTotalPage(data.pages);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    };
    getPosts();
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
    setCurrentPage(pageNum);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Posts</h1>
        <button
          onClick={() => navigate("/posts/new-post")}
          className="btn-primary flex items-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Post
        </button>
      </div>

      <div className="mb-6 flex justify-center items-center ">
        <div className="relative w-1/2">
          <input
            type="search"
            onChange={(e) => setSearchValue(e.target.value)}
            name="search"
            placeholder="Search posts..."
            className="search-field pl-10 w-full"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          <span className="ml-3 text-gray-600">Loading posts...</span>
        </div>
      ) : (
        <div className="flex  flex-col items-center justify-center gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              onClick={() => navigate(`post-details/${post._id}`)}
              className="bg-white w-1/2 rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer group"
            >
              {/* <div className="aspect-video bg-gray-100 flex items-center justify-center">
                {post.file ? (
                  <img 
                    src={post.file.url || post.file.path || img} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-200"
                  />
                ) : (
                  <img 
                    src={img} 
                    alt={post.title}
                    className="w-16 h-16 opacity-50 group-hover:opacity-70 transition-opacity duration-200"
                  />
                )}
              </div> */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-black transition-colors duration-200">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {post.desc.substring(0, 100)}
                  {post.desc.length > 100 ? "..." : ""}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Click to view details
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {posts.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts found</p>
          <button
            onClick={() => navigate("/posts/new-post")}
            className="btn-primary mt-4"
          >
            Create Your First Post
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
                    ? "bg-black text-white"
                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
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
    </div>
  );
}

export default PostList