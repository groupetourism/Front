import React from "react";

interface SitePassCardProps {
  name: string;
  imageUrl: string;
  description: string;
  price: string;
}

const SitePassCard: React.FC<SitePassCardProps> = ({ name, imageUrl, description, price }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white max-w-sm">
      {/* Display the image */}
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      
      <h2 className="text-lg font-bold text-gray-800">{name}</h2>
      <p className="text-sm text-gray-600 my-2">{description}</p>
      
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-semibold text-green-400">{price}</span>
        <button className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-blue-600 transition">
          Explore
        </button>
      </div>
    </div>
  );
};

export default SitePassCard;
