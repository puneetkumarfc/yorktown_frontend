import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import { routeConstant } from "../../constants/RouteConstants";
import { adminAuth, validation, handleApiError } from "../../utils/api";
import { useLoader } from "../../components/common/LoaderContext";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { formFields } from "../../constants/AdminLogin";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [backendError, setBackendError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const validateForm = () => {
    if (!validation.required(formData.email)) {
      setError("Email is required");
      return false;
    }
    if (!validation.required(formData.password)) {
      setError("Password is required");
      return false;
    }
    if (!validation.email(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!validation.password(formData.password)) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");
    setShowErrorPopup(false);
    setShowSuccessPopup(false);
    setBackendError("");
    setSuccessMessage("");

    try {
      const result = await adminAuth.login(
        formData.email.trim(),
        formData.password
      );

      // Success - show success popup then redirect
      setSuccessMessage(result.message || "Login successful");
      setShowSuccessPopup(true);

      // Redirect to admin dashboard after a short delay
      setTimeout(() => {
        navigate(routeConstant.ADMIN_DASHBOARD);
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);

      const errorMessage = handleApiError(error);
      setBackendError(errorMessage);
      setShowErrorPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closeErrorPopup = () => {
    setShowErrorPopup(false);
    setBackendError("");
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
    setSuccessMessage("");
    // Navigate immediately if user closes the popup
    navigate(routeConstant.ADMIN_DASHBOARD);
  };

  return (
    <div
      id="admin-login-page"
      className="w-[100vw] h-[100vh] overflow-hidden flex items-center gap-2 bg-mainBg p-2"
    >
      <div className="h-full w-[70%] overflow-hidden rounded-xl">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop"
          alt="Restaurant"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="w-[30%]">
        <div className="w-full px-4">
          <h2 className="font-roboto_serif text-black text-center font-bold text-2xl mb-4">
            Admin Login
          </h2>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {formFields.map((field) => (
              <div className="flex flex-col" key={field.id}>
                <label
                  htmlFor={field.id}
                  className="text-black/70 text-sm font-roboto"
                >
                  {field.label}
                </label>
                {field.type === "password" ? (
                  <div className="relative w-full">
                    <input
                      id={field.id}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      required
                      className="border border-black/20 w-full py-3 pl-2 pr-10 rounded-xl text-black placeholder:text-black/30 placeholder:text-sm text-sm focus:outline-none focus:border-black"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 cursor-pointer right-0 flex items-center pr-3 text-gray-400 hover:text-black"
                      onClick={() => setShowPassword((v) => !v)}
                      tabIndex="-1"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                ) : (
                  <input
                    {...field}
                    className="border border-black/20 w-full py-3 px-2 rounded-xl placeholder:text-black/30 placeholder:text-sm text-black text-sm focus:outline-none focus:border-black"
                    value={formData[field.name]}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                )}
              </div>
            ))}
            {error && <div className="admin-login-error">{error}</div>}
            <button
              className={`mt-4 border border-black rounded-xl cursor-pointer text-white font-semibold bg-black/90 hover:bg-mainBg hover:text-black/90 transition-all duration-150
               py-2 w-full ${isLoading ? "admin-login-btn-loading" : ""}`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      {/* Error Modal - styled like ThankYouModal */}
      {showErrorPopup && (
        <>
          <style>{`
            @keyframes scale-up {
              from {
                transform: scale(0.8);
                opacity: 0;
              }
              to {
                transform: scale(1);
                opacity: 1;
              }
            }
            @keyframes draw-x {
              to {
                stroke-dashoffset: 0;
              }
            }
            .animate-scale-up {
              animation: scale-up 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.1s forwards;
            }
            .animate-draw-x {
              stroke-dasharray: 50;
              stroke-dashoffset: 50;
              animation: draw-x 0.5s cubic-bezier(0.65, 0, 0.45, 1) 0.4s forwards;
            }
          `}</style>
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm"
            onClick={closeErrorPopup}
          >
            <div
              className="w-full max-w-md rounded-2xl bg-mainBg p-8 shadow-2xl flex flex-col items-center text-center relative animate-fade-in-simple"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-5 animate-scale-up opacity-0 transform scale-80">
                <XCircle
                  className="w-12 h-12 text-red-500 animate-draw-x"
                  strokeWidth="3"
                />
              </div>
              {/* Message */}
              <h2 className="text-2xl font-bold mb-3 text-black font-roboto_serif">
                Login Error
              </h2>
              <p className="text-sm text-black/70 mb-8 font-roboto font-light max-w-sm">
                {backendError}
              </p>
              {/* Button */}
              <button
                className="px-6 py-3 bg-black text-white rounded-xl hover:bg-mainBg hover:text-black transition-all duration-200 font-medium border border-black"
                onClick={closeErrorPopup}
              >
                Try Again
              </button>
            </div>
          </div>
        </>
      )}

      {/* Success Modal - styled like ThankYouModal */}
      {showSuccessPopup && (
        <>
          <style>{`
            @keyframes scale-up {
              from {
                transform: scale(0.8);
                opacity: 0;
              }
              to {
                transform: scale(1);
                opacity: 1;
              }
            }
            @keyframes draw-check {
              to {
                stroke-dashoffset: 0;
              }
            }
            .animate-scale-up {
              animation: scale-up 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.1s forwards;
            }
            .animate-draw-check {
              stroke-dasharray: 50;
              stroke-dashoffset: 50;
              animation: draw-check 0.5s cubic-bezier(0.65, 0, 0.45, 1) 0.4s forwards;
            }
          `}</style>
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm"
            onClick={closeSuccessPopup}
          >
            <div
              className="w-full max-w-md rounded-2xl bg-mainBg p-8 shadow-2xl flex flex-col items-center text-center relative animate-fade-in-simple"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-5 animate-scale-up opacity-0 transform scale-80">
                <CheckCircle
                  className="w-12 h-12 text-green-500 animate-draw-check"
                  strokeWidth="3"
                />
              </div>
              {/* Message */}
              <h2 className="text-2xl font-bold mb-3 text-black font-roboto_serif">
                Welcome Back!
              </h2>
              <p className="text-sm text-black/70 mb-4 font-roboto font-light max-w-sm">
                {successMessage}
              </p>
              <p className="text-sm text-black/50 mb-8 font-roboto font-light">
                Redirecting to dashboard...
              </p>
              {/* Button */}
              <button
                className="px-6 py-3 bg-black text-white rounded-xl hover:bg-mainBg hover:text-black transition-all duration-200 font-medium border border-black"
                onClick={closeSuccessPopup}
              >
                Continue
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminLogin;
