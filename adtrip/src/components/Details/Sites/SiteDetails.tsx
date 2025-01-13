import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSiteById } from "../../../api/Sites";
import {
  FaGlobe,
  FaPhone,
  FaBuilding,
  FaInfoCircle,
  FaClock,
  FaRoad,
  FaHandsHelping,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaCar,
  FaBus,
  FaWalking,
} from "react-icons/fa";
import MapContainer from "../../Map/OlmapContainer"; // Import the MapContainer component

// Dummy image data structure for sites
const siteImages: { [key: number]: string } = {
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
const fallbackImage = "/map.jpg";

const SiteDetails: React.FC = () => {
  const [site, setSite] = useState<any>(null);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSiteById(Number(id));
        setSite(response.data);
      } catch (error) {
        setError("Failed to fetch site details.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="text-center py-8 text-xl text-gray-600">Loading...</div>;
  if (error) return <div className="text-center py-8 text-xl text-red-500">{error}</div>;
  if (!site) return <div className="text-center py-8 text-xl text-gray-600">Site not found.</div>;

  // Convert id to a number and ensure it's a valid key in siteImages
  const siteId = Number(id);
  const imageSrc = siteImages[siteId] || fallbackImage;

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl mx-auto my-8">
      {/* Site Details Section */}
      <div className="flex flex-col md:flex-row">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2">
          <img
            src={imageSrc}
            alt={site.name}
            className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
          />
        </div>

        {/* Right Side - Details */}
        <div className="w-full md:w-1/2 p-8 space-y-6">
          {/* Name */}
          <h1 className="text-4xl font-bold text-gray-800">{site.name}</h1>

          {/* Department Name */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaBuilding className="text-blue-500" />
              Department
            </h2>
            <p className="text-gray-600 text-start">
              {site.department?.name || "No department available."}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaInfoCircle className="text-blue-500" />
              Description
            </h2>
            <p className="text-gray-600 text-start">
              {site.description || "No description available."}
            </p>
          </div>

          {/* Visiting Period */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaClock className="text-orange-500" />
              Visiting Period
            </h2>
            <p className="text-gray-600 text-start">
              {site.visite_periode || "No visiting period available."}
            </p>
          </div>

          {/* Access Means */}
          {site.access_means && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FaRoad className="text-green-500" />
                Access Means
              </h2>
              <p className="text-gray-600 text-start">{site.access_means}</p>
            </div>
          )}

          {/* Offered Services */}
          {site.offered_service && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FaHandsHelping className="text-purple-500" />
                Offered Services
              </h2>
              <p className="text-gray-600 text-start">{site.offered_service}</p>
            </div>
          )}

          {/* Cultural Information */}
          {site.cultural_info && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                Cultural Information
              </h2>
              <p className="text-gray-600 text-start">{site.cultural_info}</p>
            </div>
          )}

          {/* Ticket Price */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaTicketAlt className="text-green-500" />
              Ticket Price
            </h2>
            <p className="text-gray-600 text-start flex items-center gap-1">
              {site.ticket_price ? (
                <span className="font-medium">${site.ticket_price.toFixed(2)}</span>
              ) : (
                <span className="font-medium text-green-600">Free/Gratuit</span>
              )}
            </p>
          </div>

          {/* Contact Info */}
          {site.contact_info && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FaPhone className="text-orange-500" />
                Contact Info
              </h2>
              <p className="text-gray-600 text-start flex items-center gap-1">
                <span className="font-medium">{site.contact_info}</span>
              </p>
            </div>
          )}

          {/* Website */}
          {site.website && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FaGlobe className="text-orange-500" />
                Website
              </h2>
              <p className="text-gray-600 text-start flex items-center gap-1">
                <span className="font-medium">
                  <a
                    href={site.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline hover:text-blue-700 transition duration-300"
                  >
                    {site.website}
                  </a>
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Map and Itinerary Section */}
      {site.latitude && site.longitude && (
        <div className="w-full p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Location and Itinerary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Map Container */}
            <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
              <MapContainer latitude={site.latitude} longitude={site.longitude} name={site.name} />
            </div>

            {/* Itinerary Details */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">How to Get There</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FaCar className="text-blue-500" />
                  <p className="text-gray-600">By Car: Approximately 30 minutes</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaBus className="text-green-500" />
                  <p className="text-gray-600">By Bus: Take Route 5 to Central Station</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaWalking className="text-purple-500" />
                  <p className="text-gray-600">By Walking: 15 minutes from the city center</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteDetails;