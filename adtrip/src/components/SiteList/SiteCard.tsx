import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

interface SiteProps {
  id: number;
  name: string;
  imageUrl: string | null;
}

const SiteCard: React.FC<SiteProps> = ({ id, imageUrl, name}) => {
  const imageSrc = "./map.jpg"; // Fallback image

  return (
    <Link
    to={`/details/sites/${id}`} // Link to the details page
    className="flex flex-col sm:flex-row items-center rounded-lg overflow-hidden shadow-md transition hover:shadow-lg w-full max-w-md mx-auto mt-4 bg-slate-50 cursor-pointer"
     >
      {/* Image Section */}
      <div className="w-full sm:w-1/3">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-24 sm:h-28 object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="p-2 sm:p-3 flex-grow">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          {name}
        </h3>
      </div>
    </Link>
  );
};

export default SiteCard;