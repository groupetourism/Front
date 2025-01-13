import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAccommodationById } from "../../../api/Accomodations";
import {
  FaStar,
  FaParking,
  FaUtensils,
  FaBed,
  FaBuilding,
  FaPhone,
  FaGlobe,
  FaGlassCheers,
  FaMapMarkerAlt,
  FaUser,
  FaDirections,
} from "react-icons/fa";
import image from "/cover.jpg";
import MapContainer from "../../Map/OlmapContainer"; // Import the MapContainer component

const AccommodationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [accommodation, setAccommodation] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null); // State for human-readable address

  // Fetch accommodation data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAccommodationById(Number(id));
        console.log("Accommodation Data:", response.data); // Log the fetched data
        setAccommodation(response.data);

        // Fetch address using reverse geocoding
        if (response.data.latitude && response.data.longitude) {
          const addressResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${response.data.latitude}&lon=${response.data.longitude}`
          );
          const addressData = await addressResponse.json();
          setAddress(addressData.display_name || "Address not available");
        }
      } catch (error) {
        setError("Failed to fetch accommodation details.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="text-center py-8 text-xl text-gray-600">Loading...</div>;
  if (error) return <div className="text-center py-8 text-xl text-red-500">{error}</div>;
  if (!accommodation) return <div className="text-center py-8 text-xl text-gray-600">Accommodation not found.</div>;

  // Function to render star rating
  const renderStars = (rating: number | null) => {
    if (!rating) return null;

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

  // Function to open directions in Google Maps
  const openDirections = () => {
    if (accommodation.latitude && accommodation.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${accommodation.latitude},${accommodation.longitude}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="relative h-64 md:h-80 lg:h-96">
          <img
            src={image}
            alt={accommodation.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              {accommodation.name}
            </h1>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6">
          {/* Description */}
          <p className="text-gray-700 text-lg mb-6">
            {accommodation.description || "No description available."}
          </p>

          {/* Star Rating */}
          {accommodation.number_of_stars && (
            <div className="flex items-center mb-6">
              {renderStars(accommodation.number_of_stars)}
              <span className="ml-2 text-gray-600">
                ({accommodation.number_of_stars} stars)
              </span>
            </div>
          )}

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {accommodation.number_of_rooms && (
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <FaBed className="text-purple-500 text-2xl md:text-xl lg:text-2xl" />
                <span className="text-gray-700">{accommodation.number_of_rooms} Rooms</span>
              </div>
            )}
            {accommodation.number_of_beds && (
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <FaBed className="text-purple-500 text-2xl md:text-xl lg:text-2xl" />
                <span className="text-gray-700">{accommodation.number_of_beds} Beds</span>
              </div>
            )}
            {accommodation.parking && (
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <FaParking className="text-blue-500 text-2xl md:text-xl lg:text-2xl" />
                <span className="text-gray-700">Parking Available</span>
              </div>
            )}
            {accommodation.restaurant_capacity && (
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <FaUtensils className="text-red-500 text-2xl md:text-xl lg:text-2xl" />
                <span className="text-gray-700">Restaurant Capacity: {accommodation.restaurant_capacity}</span>
              </div>
            )}
            {accommodation.bar_capacity && (
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <FaGlassCheers className="text-yellow-500 text-2xl md:text-xl lg:text-2xl" />
                <span className="text-gray-700">Bar Capacity: {accommodation.bar_capacity}</span>
              </div>
            )}
            {accommodation.conference_room_capacity && (
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <FaBuilding className="text-green-500 text-2xl md:text-xl lg:text-2xl" />
                <span className="text-gray-700">Conference Room Capacity: {accommodation.conference_room_capacity}</span>
              </div>
            )}
            {accommodation.promoter && (
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <FaUser className="text-pink-500 text-2xl md:text-xl lg:text-2xl" />
                <span className="text-gray-700">Promoter: {accommodation.promoter}</span>
              </div>
            )}
            {accommodation.latitude && accommodation.longitude && (
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <FaMapMarkerAlt className="text-orange-500 text-2xl md:text-xl lg:text-2xl" />
                <span className="text-gray-700">
                  Location: {accommodation.latitude}, {accommodation.longitude}
                </span>
              </div>
            )}
          </div>

          {/* Contact and Website */}
          <div className="mt-8">
            {accommodation.contact_info && (
              <div className="flex items-center space-x-3 mb-4 p-4 bg-gray-50 rounded-lg">
                <FaPhone className="text-blue-500 text-2xl md:text-xl lg:text-2xl" />
                <a
                  href={`tel:${accommodation.contact_info}`}
                  className="text-blue-500 hover:underline"
                >
                  {accommodation.contact_info}
                </a>
              </div>
            )}
            {accommodation.website && (
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <FaGlobe className="text-green-500 text-2xl md:text-xl lg:text-2xl" />
                <a
                  href={accommodation.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Visit Website
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Map Section */}
      {accommodation.latitude && accommodation.longitude && (
        <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden p-6">
          <h2 className="text-2xl font-bold mb-6">Location</h2>
          {/* Address Details */}
          {address && (
            <div className="mb-6">
              <p className="text-gray-700 text-lg">
                <strong>Address:</strong> {address}
              </p>
            </div>
          )}
          {/* Directions Button */}
          <button
            onClick={openDirections}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300 mb-6"
          >
            <FaDirections className="text-xl" />
            <span>Get Directions</span>
          </button>
          {/* Map Container */}
          <div className="h-96 w-full">
            <MapContainer
              latitude={accommodation.latitude}
              longitude={accommodation.longitude}
              name={accommodation.name}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccommodationDetails;