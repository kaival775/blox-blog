import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const VerifyUser = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false)
  const [codeError, setCodeError] = useState("")
  const [loading2, setLoading2] = useState(false)
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSendVerificationCode = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/auth/verifycode", {
        email: auth.email,
      });
      const data = response.data;
      toast.success(data.message, {
        position: "top-right",
        autoClose: true,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        const data = error.response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
      } else {
        toast.error("Something went wrong. Please try again later.", {
          position: "top-right",
          autoClose: true,
        });
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code) {
      try {
        setLoading2(true)
        const response = await axios.post(`/auth/verify-user`, {
          email: auth.email,
          code
        });
        const data = response.data;
        setCode("");
        setCodeError("");
        window.localStorage.removeItem("blog-data");
        navigate('/login')
        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        });
        setLoading2(false);
      } catch (error) {
        setCode("");
        setCodeError("");
        setLoading2(false);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    } else {
      setCodeError("Code is required")
    }
  }

  return (
    <div className="max-w-md mx-auto">
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
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Verify Your Account</h1>
          <p className="text-gray-600 mt-2">Enter the verification code sent to your email</p>
          <p className="text-sm text-gray-500 mt-1">{auth.email}</p>
        </div>
        
        <div className="mb-6">
          <button
            onClick={handleSendVerificationCode}
            disabled={loading}
            className="w-full btn-secondary mb-4"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-gray-700 inline" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending Code...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Verification Code
              </>
            )}
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="input-field text-center text-lg tracking-widest"
              placeholder="Enter 6-digit code"
              maxLength={6}
            />
            {codeError && (
              <p className="error-text mt-1">{codeError}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading2}
            className="btn-primary w-full"
          >
            {loading2 ? "Verifying..." : "Verify Account"}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Didn't receive the code? Check your spam folder or click "Send Verification Code" again.</p>
        </div>
      </div>
    </div>
  );
}

export default VerifyUser;