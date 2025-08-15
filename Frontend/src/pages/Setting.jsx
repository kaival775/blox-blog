import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import changePasswordValidator from "../validators/changePasswordValidator";
import { useAuth } from "../context/AuthContext";

const initialFormData = {
  oldPassword: "",
  newPassword: "",
};
const initialFormError = {
  oldPassword: "",
  newPassword: "",
};

const Setting = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  // console.log(auth)

  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = changePasswordValidator(formData);
    if (errors.oldPassword || errors.newPassword) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);
        const response = await axios.put("/auth/change-password", formData);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: true,
        });
        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
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
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account security and verification</p>
      </div>
      
      {!auth.isVerified && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-amber-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div className="flex-1">
              <h3 className="text-amber-800 font-medium">Account Verification Required</h3>
              <p className="text-amber-700 text-sm mt-1">Your account is not verified. Please verify your email to access all features.</p>
              <button
                onClick={() => navigate("/verify-user")}
                className="mt-3 bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors duration-200"
              >
                Verify Account
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Change Password</h2>
          <p className="text-gray-600 text-sm">Update your password to keep your account secure</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your current password"
            />
            {formError.oldPassword && (
              <p className="error-text mt-1">{formError.oldPassword}</p>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your new password"
            />
            {formError.newPassword && (
              <p className="error-text mt-1">{formError.newPassword}</p>
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
              {loading ? "Changing Password..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;
