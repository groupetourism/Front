import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ViewAllSites from "../../components/Details/Sites/AllSites"; // Import the ViewAllSites component
import coverImage from "/cover.jpg";

const ViewingPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignUpClick = () => {
    navigate("/signup"); // Redirect to the sign-up page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative w-full top-0 left-0 h-[60vh] sm:h-[70vh] lg:h-[80vh]">
        {/* Cover Image */}
        <img
          className="w-full h-full object-cover"
          src={coverImage}
          alt="Cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-3xl md:text-5xl font-bold">
              Discover Beautiful Destinations
            </h1>
            <p className="mt-4 text-sm md:text-base">
              Plan your next adventure with Adtrip.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* View All Sites Component */}
        <ViewAllSites />
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Explore?
          </h2>
          <p className="text-lg text-gray-100 mb-6">
            Sign up now to get exclusive access to travel guides, discounts, and more!
          </p>
          <button
            onClick={handleSignUpClick}
            className="px-8 py-3 bg-white text-orange-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
          >
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewingPage;