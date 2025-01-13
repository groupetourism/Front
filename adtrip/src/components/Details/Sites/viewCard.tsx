import React from "react";
import { Link } from "react-router-dom";

// Dummy image data structure for sites
const siteImages = {
    1: "./sites/site1.jpg",
    2: "./sites/site2.jpg",
    3: "./sites/site3.jpg",
    4: "./sites/site4.jpg",
    5: "./sites/site5.jpg",
    6: "./sites/site6.jpg",
    7: "./sites/site7.jpg",
    8: "./sites/site8.jpg",
    9: "./sites/site9.jpg",
    10: "./sites/site10.jpg",
    11: "./sites/site11.jpg",
    12: "./sites/site12.jpg",
    13: "./sites/site13.jpg",
    14: "./sites/site14.jpg",
    15: "./sites/site15.jpg",
    16: "./sites/site16.jpg",
    17: "./sites/site17.jpg",
    18: "./sites/site18.jpg",
    19: "./sites/site19.jpg",
    20: "./sites/site20.jpg",
    21: "./sites/site21.jpg",
    22: "./sites/site22.jpg",
    23: "./sites/site23.jpg",
    24: "./sites/site24.jpg",
    25: "./sites/site25.jpg",
  };

interface SiteProps {
  id: number;
  name: string;
  imageUrl: string | null;
  description?: string | null;
  ticketPrice?: number | null;
}

const ViewCard: React.FC<SiteProps> = ({ id, imageUrl, name, description, ticketPrice }) => {
  // Dynamically assign the image path based on the site ID
  const imageSrc = siteImages[id as keyof typeof siteImages] || imageUrl || "./map.jpg";

  return (
    <Link
      to={`/details/sites/${id}`} // Link to the details page
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image Section */}
      <div className="w-full h-48 relative">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      {/* Text Section */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4">
          {description || "No description available."}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Ticket Price: ${ticketPrice || "N/A"}
          </span>
          <button
            className="px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition"
          >
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ViewCard;