import React from "react";
import { FaStar } from "react-icons/fa"; // Import the star icon
import { Link } from "react-router-dom"; // Import Link for navigation

interface CardProps {
  id: number;
  image: string | null;
  name: string;
  description: string | null;
  number_of_stars: number | null;
}

const AccommodationCard: React.FC<CardProps> = ({
  id,
  image,
  name,
  description,
  number_of_stars,
}) => {
  const imageUrl =  "./cover.jpg"; // Fallback image if none is provided
  const descriptionFallback = description || "No description available.";

  // Function to render star rating
  const renderStars = (rating: number | null) => {
    if (!rating) return null; // If no rating is provided, return nothing

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= rating ? "text-yellow-400" : "text-gray-300"}
        />
      );
    }
    return <div className="flex space-x-1">{stars}</div>;
  };

  return (
    <Link
      to={`/details/accommodations/${id}`} // Link to the details page
      className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 w-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm mx-auto overflow-hidden"
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
            Book Now!
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h2 className="text-lg text-start font-semibold mb-2">{name}</h2>
        <p className="text-sm text-start text-gray-600 line-clamp-3 overflow-hidden overflow-ellipsis">
          {descriptionFallback}
        </p>

        {/* Star Rating */}
        {number_of_stars && (
          <div className="mt-2 flex items-center">
            {renderStars(number_of_stars)}
            <span className="ml-2 text-sm text-gray-600">
              ({number_of_stars} stars)
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default AccommodationCard;