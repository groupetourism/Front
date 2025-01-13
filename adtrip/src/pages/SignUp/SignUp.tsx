import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons
import { validatePhoneNumber, validateForm } from "../../utils/FormValidation";
import { signUp } from "../../api/Auth";
import coverImage from "/carte.jpg";
import googleIcon from "/google.png";
import backgroundIcon2 from "/airport.png";
import backgroundIcon3 from "/car.png";
import backgroundIcon4 from "/bridge.png";

const SignUpPage: React.FC = () => {
  const [showMoreFields, setShowMoreFields] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleMoreFields = () => {
    setShowMoreFields(!showMoreFields);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const { isValid, errors } = validateForm(formData);
    setErrors(errors);

    if (isValid) {
      try {
        console.log("Form Data:", formData); // Log form data
        const { data, error } = await signUp({
          ...formData,
          password_confirmation: formData.password_confirmation, // Ensure this is sent to the API
        });
        if (error) {
          console.error("API Error:", error); // Log API error
          setApiError(error);
        } else {
          console.log("API Response:", data); // Log API response
          alert("Sign-up successful! Redirecting to login...");
          navigate("/login"); // Redirect to the login page
        }
      } catch (error: any) {
        console.error("Sign-up failed:", error); // Log unexpected error
        console.error("Error Details:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        setApiError("An unexpected error occurred. Please try again.");
      }
    }
  };
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-6xl mx-4 lg:mx-8 h-auto lg:h-[90%] flex flex-col lg:flex-row overflow-hidden bg-white shadow-2xl rounded-2xl">
        {/* Left Side with Image */}
        <div className="w-full lg:w-1/2 h-64 lg:h-auto relative">
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 p-4">
            <h1 className="text-2xl lg:text-4xl text-white font-bold mb-4">
              Explore Cameroon's Most Beautiful Sites
            </h1>
            <p className="text-sm lg:text-lg text-white font-semibold">
              Ready for an unforgettable trip? Adtrip has you covered.
            </p>
          </div>
          <img
            src={coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side with Form */}
        <div
          className="w-full lg:w-1/2 bg-slate-50 flex flex-col p-6 lg:p-8 justify-center overflow-y-auto"
          style={{
            backgroundImage: `url(${backgroundIcon2}), url(${backgroundIcon3}), url(${backgroundIcon4})`,
            backgroundRepeat: "no-repeat, no-repeat, no-repeat",
            backgroundPosition: "bottom center, bottom left, bottom right",
            backgroundSize: "30px, 30px, 40px",
          }}
        >
          <div className="flex flex-col space-y-4 lg:space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-black font-bold text-2xl lg:text-3xl">
                Sign Up
              </h1>
              <p className="text-slate-800 text-sm lg:text-base mt-1 lg:mt-2">
                Create an account to start your journey with Adtrip.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-3 lg:space-y-4" onSubmit={handleSubmit}>
              {/* Name Fields */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full">
                  <input
                    id="firstname"
                    type="text"
                    placeholder="First Name"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
                  />
                  {errors.firstname && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
                  )}
                </div>
                <div className="w-full">
                  <input
                    id="lastname"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
                  />
                  {errors.lastname && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Additional Fields (Hidden by Default) */}
              {showMoreFields && (
                <>
                  {/* Phone Field */}
                  <div>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"} // Toggle input type
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      {!showPassword ? (
                        <FaEyeSlash className="text-gray-500" /> // Hidden icon
                      ) : (
                        <FaEye className="text-gray-500" /> // Visible icon
                      )}
                    </button>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="relative">
                    <input
                      id="password_confirmation"
                      type={showConfirmPassword ? "text" : "password"} // Toggle input type
                      placeholder="Confirm Password"
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      {!showConfirmPassword ? (
                        <FaEyeSlash className="text-gray-500" /> // Hidden icon
                      ) : (
                        <FaEye className="text-gray-500" /> // Visible icon
                      )}
                    </button>
                    {errors.password_confirmation && (
                      <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>
                    )}
                  </div>
                </>
              )}

              {/* Show More Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={toggleMoreFields}
                  className="text-sm text-slate-600 hover:text-slate-800 underline underline-offset-2 cursor-pointer"
                >
                  {showMoreFields ? "Show Less" : "Show More"}
                </button>
              </div>

              {/* Buttons */}
              <div className="space-y-2">
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-lg hover:bg-slate-800 transition duration-300 transform hover:scale-105"
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  className="w-full bg-white border border-black rounded-lg py-2 flex items-center justify-center hover:bg-slate-100 transition duration-300 transform hover:scale-105"
                >
                  <img src={googleIcon} className="h-5 mr-2" alt="Google" />
                  Sign Up with Google
                </button>
              </div>
            </form>
            {apiError && <p style={{ color: "red" }}>{apiError}</p>}
            {/* Divider */}
            <div className="flex items-center space-x-2">
              <div className="w-full h-px bg-gray-300"></div>
              <p className="text-sm text-gray-500">or</p>
              <div className="w-full h-px bg-gray-300"></div>
            </div>

            {/* Login Prompt */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-black underline underline-offset-2 cursor-pointer hover:text-slate-800"
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;