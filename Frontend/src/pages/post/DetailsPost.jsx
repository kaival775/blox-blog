import React, { useState } from 'react'
import img from "../../assets/images/vite.svg"
import axios from '../../utils/axiosInstance'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import { useAuth } from '../../context/AuthContext'

const DetailsPost = () => {
  const params = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const [fileUrl, setFileUrl] = useState(null);
  const [postId, setPostId] = useState(params.id);
  const [post, setPost] = useState({title: "", desc: "", category: "", createdAt: "", updatedAt: "", updatedBy: null})
  const [showModal, setShowModal] = useState(false)
  
  // Check if current user is the owner of the post
  const isOwner = auth && post.updatedBy && auth._id === post.updatedBy._id;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${postId}`);
        const data = response.data.data.post;
        console.log(data)
        setPost(data)
      } catch (error) {
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true,
        });
      }
    }
    fetchPost()
  }, [postId])

  useEffect(() => {
    if (post && post?.file) {
      const getFile = async () => {
        try {
          // api request
          const response = await axios.get(
            `/file/signed-url?key=${post.file.key}`
          );
          const data = response.data.data;

          setFileUrl(data.url);
        } catch (error) {
          const response = error.response;
          const data = response.data;
          toast.error(data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true,
          });
        }
      };

      getFile();
    }
  }, [post]);

  const handleDelete = async () => {
    try {
      setShowModal(false);
      const response = await axios.delete(`/posts/${postId}`);
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: true,
      });
      navigate(-1)
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: true,
      });
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-black transition-colors duration-200"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Go Back
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
            {isOwner && (
              <div className="flex space-x-3">
                <button
                  onClick={() => navigate(`/posts/update-post/${postId}`)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 inline mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowModal(true);
                    setPostId(postId);
                  }}
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 inline mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {post.category?.title}
              </span>
              <span>
                Created: {moment(post.createdAt).format("MMM DD, YYYY")}
              </span>
              <span>
                Updated: {moment(post.updatedAt).format("MMM DD, YYYY")}
              </span>
            </div>
          </div>

          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.desc}
            </div>
          </div>
        </div>
        {fileUrl && (
          <div className="bg-gray-50 p-8 flex items-center justify-center">
            <img
              src={fileUrl}
              alt={post.title}
              className="w-54 h-54 object-cover"
            />
          </div>
        )}
      </div>

      {/* Custom Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
            <div className="flex space-x-3 justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                  setPostId(null);
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

export default DetailsPost