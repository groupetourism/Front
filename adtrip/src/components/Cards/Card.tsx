  import React from "react";

  interface CardProps {
    imageUrl: string;
    name: string;
    review: string;
  }

  const Card: React.FC<CardProps> = ({ imageUrl, name, review }) => {
    return (
      <div
        className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 w-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm mx-auto overflow-hidden"
      >
        {/* Image Section */}
        <div className="relative">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-40 object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button className="text-white px-4 py-2 bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 transition">
              Explore
            </button>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-4 max-h-[100px] overflow-hidden">
          <h2 className="text-lg text-start font-semibold mb-2">{name}</h2>
          <p className="text-sm text-start text-gray-600 line-clamp-3">{review}</p>
        </div>
      </div>
    );
  };

  export default Card;
