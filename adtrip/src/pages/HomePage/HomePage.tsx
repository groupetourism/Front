import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import coverImage from "/cover.jpg";
import DummyCards from "../../components/Cards/DummyCard";
import SiteList from "../../components/SiteList/SiteList";
import AccomodationsList from "../../components/Accomodations/AcommodationList";

const HomePage: React.FC = () => {
  return (
    <>
      {/* Full Page Wrapper */}
      <div className="relative w-full h-auto bg-slate-100">
        {/* Navbar */}
        <NavBar />

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
              {/* Call-to-Action Button */}
              <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition">
                Plan a Trip
              </button>
            </div>
          </div>
        </div>

        {/* Popular Destinations Section */}
        <section className="py-10 px-10 sm:px-6 lg:px-8">
          {/* Title Row */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-left text-2xl md:text-3xl font-bold">
              Popular Destinations
            </h2>
            {/* Show More Button */}
            <button className="flex items-center text-sm sm:text-base px-4 py-2 border border-black text-black rounded-2xl transition cursor-pointer hover:bg-black hover:text-white">
              Show More
              {/* Arrow Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
          <DummyCards />
        </section>

        {/* Top Sites to Visit Section */}
        <section className="py-10 px-10 sm:px-6 lg:px-8 bg-white">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-left text-2xl md:text-3xl font-bold">
              Top Sites to Visit
            </h2>
            {/* View All Button */}
            <button className="flex items-center text-sm sm:text-base px-4 py-2 border border-black text-black rounded-2xl transition cursor-pointer hover:bg-black hover:text-white">
              View All
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
          {/* Site List */}
          <SiteList />
        </section>

        {/* Accommodations Section */}
        <section className="py-10 px-10 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-left text-2xl md:text-3xl font-bold">
              Accommodations
            </h2>
            <button className="flex items-center text-sm sm:text-base px-4 py-2 border border-black text-black rounded-2xl transition cursor-pointer hover:bg-black hover:text-white">
              Book Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
          <AccomodationsList/>
        </section>
      </div>
    </>
  );
};

export default HomePage;
