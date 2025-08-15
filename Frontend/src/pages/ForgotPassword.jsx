import { useState } from 'react'
import recoverPasswordValidator from "../validators/recoverPasswordValidator";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import sendCodeValidator from '../validators/sendCodeValidator';

const initialFormData = {
  email: "",
  code: "",
  password: "",
};

const initialFormError = {
  code: "",
  password: "",
};

const ForgotPassword = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("")
  const [hasEmail, setHasEmail] = useState(false)
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSendCode = async (e) => {
    e.preventDefault();
    const errors = sendCodeValidator({email: formData.email})
    if (errors.email) {
      setEmailError(errors.email)
    } else {
      try {
        setLoading(true)
        const response = await axios.post(
          "/auth/forgot-password-code", {email: formData.email}
        );
        toast.success(response.data.message, {position: "top-right"})
        setLoading(false)
        setFormError(initialFormError)
        setHasEmail(true)
      } catch (error) {
        toast.error(error.response.data.message, {position: "top-right", autoclose: true})
        setLoading(false)
      }
    }
  }

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    const errors = recoverPasswordValidator(formData);
    if (errors.code || errors.password) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);
        console.log(formData)
        const response = await axios.post("/auth/recover-password", formData);
        toast.success(response.data.message, { position: "top-right" });
        setLoading(false);
        navigate("/login");
        setFormError(initialFormError)
        setFormData(initialFormData);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoclose: true,
        });
        setLoading(false);
        console.log(error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-black transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Go back
          </button>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {!hasEmail ? "Reset Password" : "Enter New Password"}
            </h2>
            <p className="text-gray-600 mt-2">
              {!hasEmail 
                ? "Enter your email to receive a reset code" 
                : "Enter the code sent to your email and your new password"
              }
            </p>
          </div>
          
          <form onSubmit={!hasEmail ? handleSendCode : handleRecoverPassword} className="space-y-6">
            {!hasEmail ? (
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
                {emailError && (
                  <p className="error-text mt-1">{emailError}</p>
                )}
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    id="code"
                    value={formData.code}
                    name="code"
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter the code from your email"
                  />
                  {formError.code && (
                    <p className="error-text mt-1">{formError.code}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter your new password"
                  />
                  {formError.password && (
                    <p className="error-text mt-1">{formError.password}</p>
                  )}
                </div>
              </>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading 
                ? (!hasEmail ? "Sending Code..." : "Updating Password...") 
                : (!hasEmail ? "Send Reset Code" : "Update Password")
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword