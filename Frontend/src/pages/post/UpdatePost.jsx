import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
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

const UpdatePost = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [extensionError, setExtensionError] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [isDisable, setIsDisable] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;

  useEffect(() => {
    if (postId) {
      const getPost = async () => {
        try {
          // api request
          const response = await axios.get(`/posts/${postId}`);
          const data = response.data.data;

          setFormData({
            title: data.post.title,
            desc: data.post.desc,
            category: data.post.category._id,
            file: data.post?.file?._id,
          });
        } catch (error) {
          const response = error.response;
          const data = response.data;
          toast.error(data.message, {
            position: "top-right",
            autoClose: true,
          });
        }
      };

      getPost();
    }
  }, [postId]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        // api request
        const response = await axios.get(`/category?size=1000`);
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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
        // api request
        const response = await axios.put(`/posts/${postId}`, input);
        const data = response.data;

        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        });
        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate(`/posts/${postId}`);
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
        // api request
        const response = await axios.post("/file/upload", formInput);
        const data = response.data;
        console.log(data);
        setFileId(data.data._id);

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <button 
          onClick={() => navigate(-1)}
          className="btn-secondary mb-6"
        >
          ← Go Back
        </button>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Update Post</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="React blog post"
                value={formData.title}
                onChange={handleChange}
                className="input-field"
              />
              {formError.title && <p className="error-text">{formError.title}</p>}
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="desc"
                placeholder="Lorem ipsum"
                value={formData.desc}
                onChange={handleChange}
                rows={4}
                className="input-field resize-none"
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select an image
              </label>
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                accept="image/png,image/jpg,image/jpeg"
                className="input-field file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
              />
              {extensionError && <p className="error-text">{extensionError}</p>}
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select a category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Choose a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
              {formError.category && <p className="error-text">{formError.category}</p>}
            </div>

            <button
              type="submit"
              disabled={isDisable || loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
