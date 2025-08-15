import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import addPostValidator from "../../validators/addPostValidator";

const initialFormData = {
  title: "",
  desc: "",
  category: "",
};

const initialFormError = {
  title: "",
  category: "",
};

const NewPost = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [extensionError, setExtensionError] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [isDisable, setIsDisable] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(`/category/all?size=1000`);
        const data = response.data.data;
        setCategories(data.categories);
      } catch (error) {
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    };
    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = addPostValidator({
      title: formData.title,
      category: formData.category,
    });
    if (errors.title || errors.category) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);
        let input = formData;
        if (fileId) {
          input = { ...input, file: fileId };
        }
        console.log(input)
        const response = await axios.post("/posts/add-post", input);
        const data = response.data;
        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        });
        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate("/posts");
      } catch (error) {
        setLoading(false);
        setFormError(initialFormError);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    }
  };

  const handleFileChange = async (e) => {
    const formInput = new FormData();
    formInput.append("image", e.target.files[0]);
    const type = e.target.files[0].type;

    if (type === "image/png" || type === "image/jpg" || type === "image/jpeg") {
      setExtensionError(null);
      try {
        setIsDisable(true);
        const response = await axios.post("/file/upload", formInput);
        const data = response.data;
        setFileId(data.data._id);
        console.log("File ID:", data.data._id, "Key:", data.data.key);
        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        });
        setIsDisable(false);
      } catch (error) {
        setIsDisable(false);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    } else {
      setExtensionError("Only .png or .jpg or .jpeg file allowed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Post Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter post title"
            />
            {formError.title && (
              <p className="error-text mt-1">{formError.title}</p>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-2">
              Post Description
            </label>
            <textarea
              id="desc"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              rows={6}
              className="input-field resize-none"
              placeholder="Write your post content here..."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image (Optional)
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 transition-colors duration-200"
            />
            {extensionError && (
              <p className="error-text mt-1">{extensionError}</p>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
            {formError.category && (
              <p className="error-text mt-1">{formError.category}</p>
            )}
          </div>
          
          <div className="flex items-center justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => navigate("/posts")}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || isDisable}
              className="btn-primary"
            >
              {loading ? "Creating Post..." : isDisable ? "Uploading..." : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;