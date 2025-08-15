import axios from "axios";

const axiosInstance = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/v1` : "http://localhost:8000/api/v1" 
});

axiosInstance.interceptors.request.use((req) => {
  const stringifyBlogData = window.localStorage.getItem("blog-data");

  if (stringifyBlogData) {
    const blogData = JSON.parse(stringifyBlogData);
    const token = blogData.token;

    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default axiosInstance;
