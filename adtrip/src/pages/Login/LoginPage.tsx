import React from "react";
import coverImage from "/carte.jpg";
import googleIcon from "/google.png";
import backgroundIcon2 from "/airport.png";
import backgroundIcon3 from "/car.png";
import backgroundIcon4 from "/bridge.png";

const LoginPage: React.FC = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="w-full h-full lg:w-[70%] lg:h-[80%] flex flex-col lg:flex-row overflow-hidden bg-white shadow-lg rounded-lg">
        {/* Left Side with Image */}
        <div className="w-full lg:w-1/2 h-full relative">
          <div className="absolute top-[15%] sm:top-[20%] left-[5%] py-5 px-4 lg:py-20 lg:left-[10%] flex flex-col z-10">
            <h1 className="text-2xl lg:text-3xl text-white my-4 font-bold text-center lg:text-left">
              Explore Cameroon's Most Beautiful Sites
            </h1>
            <p className="text-sm lg:text-base text-white font-semibold text-center lg:text-left">
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
          className="w-full lg:w-1/2 h-full bg-slate-50 flex flex-col p-6 lg:p-8 justify-center overflow-y-auto lg:overflow-visible"
          style={{
            backgroundImage: `url(${backgroundIcon2}), url(${backgroundIcon3}), url(${backgroundIcon4})`,
            backgroundRepeat: "no-repeat, no-repeat, no-repeat",
            backgroundPosition: "bottom center, bottom left, bottom right",
            backgroundSize: "30px, 30px, 40px",
          }}
        >
          <div className="flex flex-col space-y-6 lg:space-y-8">
            {/* Title */}
            <div>
              <h1 className="text-black font-bold text-left text-2xl lg:text-4xl">
                Login
              </h1>
              <p className="text-slate-800 text-sm lg:text-base text-left font-normal mt-2 lg:mt-4">
                Welcome Back! Please enter your credentials.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4 lg:space-y-6">
              {/* Email Field */}
              <div>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
                />
              </div>

              {/* Password Field */}
              <div>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
                />
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-slate-800">
                  <input
                    type="checkbox"
                    className="mr-2 hover:cursor-pointer accent-slate-600 w-4 h-4"
                  />
                  Remember Me
                </label>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-slate-800 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-slate-800 transition"
                >
                  Log In
                </button>
                <button
                  type="button"
                  className="w-full bg-white border border-black rounded-lg py-3 flex items-center justify-center hover:bg-slate-100 transition"
                >
                  <img src={googleIcon} className="h-5 mr-2" alt="Google" />
                  Sign In with Google
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center space-x-2">
              <div className="w-full h-px bg-black"></div>
              <p className="text-sm text-black">or</p>
              <div className="w-full h-px bg-black"></div>
            </div>

            {/* Signup Prompt */}
            <p className="text-center text-sm text-black">
              Don't have an account?{" "}
              <span className="font-semibold underline underline-offset-2 cursor-pointer">
                Sign up for free
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
