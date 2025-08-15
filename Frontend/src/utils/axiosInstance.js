import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const axiosInstance = axios.create({ 
  baseURL: `${baseURL}/api/v1`
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
