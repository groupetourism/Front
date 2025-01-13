import React from "react";
import { Link } from "react-router-dom";

const EventSection: React.FC = () => {
  return (
    <div className="w-full h-full">
      {/* Gradient Box */}
      <div className="bg-gradient-to-br from-green-700 via-emerald-500 to-indigo-500 text-white p-6 md:p-12 lg:p-16 xl:p-20 rounded-none shadow-lg w-full flex flex-col md:flex-row items-center justify-between">
        {/* Left Side: Text Content */}
        <div className="flex-1 flex flex-col space-y-4 md:space-y-6 justify-center md:mr-8 lg:mr-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-left leading-tight">
            Feel Like a Local: Join <br className="hidden md:block" />
            Events Launched in the Various <br className="hidden md:block" />
            Sites of the Adamaoua Region
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-left text-gray-100">
            Discover events each with a unique story and experience
          </p>
          <Link  className="px-6 py-3 w-fit mt-4 md:mt-6"to ="/events">
          <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition w-fit mt-4 md:mt-6">
            Learn More
          </button>
          </Link>
         
        </div>

        {/* Right Side: Image Content */}
        <div className="flex-1 flex items-center justify-center h-48 sm:h-56 md:h-64 lg:h-80 w-full md:w-auto mt-8 md:mt-0">
          <img
            src="/cover.jpg" /* Replace with your image URL */
            alt="Event Visual"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default EventSection;