import React, { useEffect, useState } from "react";
import coverImage from "/carte.jpg";
import googleIcon from "/google.png";
import backgroundIcon2 from "/airport.png";
import backgroundIcon3 from "/car.png";
import backgroundIcon4 from "/bridge.png";
import { useNavigate, Link } from "react-router-dom";
import { validateLoginForm } from "../../utils/FormValidation";
import { login as apiLogin, fetchUserData, ApiResponse } from "../../api/Auth";
import { useUser } from "../../context/AuthContext";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate form
    const { isValid, errors } = validateLoginForm(formData);
    setErrors(errors);
  
    if (isValid) {
      try {
        console.log("Form Data:", formData);
        const { data, error }: ApiResponse = await apiLogin({
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        });
  
        if (error) {
          console.error("API Error:", error);
          setApiError(error);
        } else {
          console.log("API Response:", data);
  
          // Fetch user data using the user_id and token
          const { data: userData, error: userError } = await fetchUserData(data.user_id, data.token);
  
          if (userError) {
            console.error("Failed to fetch user data:", userError);
            setApiError(userError);
          } else {
            console.log("User Data:", userData);
  
            // Update user state in context and localStorage
            login(userData, data.token);
  
            alert("Login successful! Redirecting to dashboard...");
            navigate("/");
          }
        }
      } catch (error: any) {
        console.error("Login failed:", error);
        setApiError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="w-full h-full max-w-7xl mx-auto flex flex-col lg:flex-row overflow-hidden bg-white shadow-lg rounded-lg">
        {/* Left Side with Image */}
        <div className="w-full lg:w-1/2 h-[40vh] lg:h-full relative">
          <div className="absolute top-[10%] sm:top-[15%] left-[5%] py-4 px-4 lg:py-20 lg:left-[10%] flex flex-col z-10">
            <h1 className="text-xl sm:text-2xl lg:text-3xl text-white my-2 sm:my-4 font-bold text-center lg:text-left">
              Explore Cameroon's Most Beautiful Sites
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-white font-semibold text-center lg:text-left">
              Want a memorable trip? Adtrip has you covered.
            </p>
          </div>
          <img
            src={coverImage}
            className="h-full w-full object-cover"
            alt="Cover"
          />
        </div>

        {/* Right Side with Form */}
        <div
          className="w-full lg:w-1/2 h-[60vh] lg:h-full bg-slate-50 flex flex-col p-4 sm:p-6 lg:p-8 justify-center overflow-y-auto"
          style={{
            backgroundImage: `url(${backgroundIcon2}), url(${backgroundIcon3}), url(${backgroundIcon4})`,
            backgroundRepeat: "no-repeat, no-repeat, no-repeat",
            backgroundPosition: "bottom center, bottom left, bottom right",
            backgroundSize: "20px, 20px, 30px",
          }}
        >
          <div className="flex flex-col space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Title */}
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl text-black font-bold text-left">
                Login
              </h1>
              <p className="text-xs sm:text-sm lg:text-base text-slate-800 text-left font-normal mt-1 sm:mt-2 lg:mt-4">
                Welcome Back! Please enter your credentials.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-3 sm:space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 text-sm sm:text-base"
                />
                {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone Field */}
              <div>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 text-sm sm:text-base"
                />
                {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Password Field */}
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 text-sm sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                {errors.password && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center text-xs sm:text-sm text-slate-800">
                  <input
                    type="checkbox"
                    className="mr-2 hover:cursor-pointer accent-slate-600 w-4 h-4"
                  />
                  Remember Me
                </label>
                <a
                  href="#"
                  className="text-xs sm:text-sm text-slate-600 hover:text-slate-800 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Buttons */}
              <div className="space-y-2 sm:space-y-3">
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 sm:py-3 rounded-lg hover:bg-slate-800 transition text-sm sm:text-base"
                >
                  Log In
                </button>
                <button
                  type="button"
                  className="w-full bg-white border border-black rounded-lg py-2 sm:py-3 flex items-center justify-center hover:bg-slate-100 transition text-sm sm:text-base"
                >
                  <img src={googleIcon} className="h-4 sm:h-5 mr-2" alt="Google" />
                  Sign In with Google
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center space-x-2">
              <div className="w-full h-px bg-black"></div>
              <p className="text-xs sm:text-sm text-black">or</p>
              <div className="w-full h-px bg-black"></div>
            </div>

            {/* Signup Prompt */}
            <p className="text-center text-xs sm:text-sm text-black">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold underline underline-offset-2 cursor-pointer">
                Sign up for free
              </Link>
            </p>

            {/* API Error */}
            {apiError && <p className="text-red-500 text-xs sm:text-sm mt-2">{apiError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;