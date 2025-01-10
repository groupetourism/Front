import React from "react";

const EventCard: React.FC = () => {
  return (
    // Card Main Container
    <div className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm mx-auto overflow-hidden">
      {/* Image Section */}
      <div className="relative">
        {/* Image */}
        <img
          src="/cover.jpg" // Replace with your image URL
          alt="Event"
          className="w-full h-48 sm:h-56 object-cover"
        />

        {/* Ticket Price Tag (Top Left) */}
        <div className="absolute top-3 left-3 bg-white text-orange-500 text-sm font-semibold px-3 py-1 rounded-full shadow-md">
          $50
        </div>

        {/* Date Section (Bottom Left) */}
        <div className="absolute bottom-3 left-3 bg-white bg-opacity-90 text-gray-800 text-sm px-3 py-2 rounded-md shadow-sm">
          <p className="font-semibold text-orange-500">12 Oct - 15 Oct</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Event Name */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Music Festival 2023
        </h2>

        {/* Event Description */}
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          Join us for the biggest music festival of the year! Featuring top
          artists from around the world, this event promises an unforgettable
          experience. Don't miss out!
        </p>

        {/* Enroll Button */}
        <div className="mt-4">
          <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition duration-300 shadow-md">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;