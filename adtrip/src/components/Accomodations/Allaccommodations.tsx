import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { fetchAccommodations, AccommodationData } from "../../api/Accomodations"; // Adjust the import path
import { FaStar, FaBed, FaParking, FaUtensils } from "react-icons/fa"; // Icons for amenities

const AccommodationsList: React.FC = () => {
  const [accommodations, setAccommodations] = useState<AccommodationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch accommodations on component mount
  useEffect(() => {
    const loadAccommodations = async () => {
      const response = await fetchAccommodations();
      if (response.data) {
        setAccommodations(response.data);
      } else {
        setError(response.error || "Failed to fetch accommodations");
      }
      setLoading(false);
    };
    loadAccommodations();
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading accommodations...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">All Accommodations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {accommodations.map((accommodation) => (
          <Link
            key={accommodation.id}
            to={`/details/accommodations/${accommodation.id}`} // Link to the details page
            className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            {/* Accommodation Image */}
            <div className="relative h-48">
              <img
                src={accommodation.image || "https://via.placeholder.com/400x200"} // Fallback image if no image is provided
                alt={accommodation.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Star Rating */}
              {accommodation.number_of_stars && (
                <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full flex items-center space-x-1">
                  <FaStar className="text-yellow-500" />
                  <span className="text-sm font-semibold">
                    {accommodation.number_of_stars}
                  </span>
                </div>
              )}
            </div>

            {/* Accommodation Details */}
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors duration-300">
                {accommodation.name}
              </h2>
              <p className="text-gray-600 mb-4">
                {accommodation.description || "No description available."}
              </p>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mb-4">
                {accommodation.number_of_beds && (
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <FaBed />
                    <span>{accommodation.number_of_beds} Beds</span>
                  </div>
                )}
                {accommodation.parking && (
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <FaParking />
                    <span>Parking</span>
                  </div>
                )}
                {accommodation.restaurant_capacity && (
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <FaUtensils />
                    <span>Restaurant</span>
                  </div>
                )}
              </div>

              {/* Contact and Website */}
              <div className="space-y-2">
                {accommodation.contact_info && (
                  <p className="text-sm text-gray-600">
                    <strong>Contact:</strong> {accommodation.contact_info}
                  </p>
                )}
                {accommodation.website && (
                  <a
                    href={accommodation.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-orange-500 hover:underline"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AccommodationsList;