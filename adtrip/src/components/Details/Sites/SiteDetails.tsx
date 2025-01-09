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
  FaTicketAlt 
 } from "react-icons/fa";
 import image from "/cover.jpg";

const SiteDetails: React.FC= () => {
  const [site, setSite] = useState<any>(null);
  const {id}=useParams<{id:string}>();
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

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl mx-auto my-8">
    {/* Left Side - Image */}
    <div className="w-full md:w-1/2">
      <img
        src={image}
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
  );
};

export default SiteDetails;