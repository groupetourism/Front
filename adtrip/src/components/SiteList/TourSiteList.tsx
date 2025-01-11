import React, { useEffect, useState } from "react";
import { fetchSites, SiteData } from "../../api/Sites"; // Adjust the import path as needed
import { Link } from "react-router-dom";

const TourSiteList: React.FC = () => {
  const [sites, setSites] = useState<SiteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false); // State to manage "Show More" functionality

  // Fetch sites on component mount
  useEffect(() => {
    const getSites = async () => {
      try {
        const { data, error } = await fetchSites();
        if (error) {
          setError(error);
        } else {
          setSites(data || []);
        }
      } catch (err) {
        setError("Failed to fetch sites.");
      } finally {
        setLoading(false);
      }
    };

    getSites();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600">Loading sites...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  // Determine the number of sites to display
  const displayedSites = showAll ? sites : sites.slice(0, 8);

  return (
    <div>
      {/* Grid layout with 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedSites.map((site) => (
          <Link
            key={site.id}
            to={`/details/sites/${site.id}`}
            className="block transform transition-transform duration-300 hover:scale-105"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden rounded-md">
                <img
                  src={site.image || "https://via.placeholder.com/150"}
                  alt={site.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mt-4 text-gray-800">{site.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{site.description}</p>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Ticket Price:</span> $
                  {site.ticket_price || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Department:</span>{" "}
                  {site.department?.name || "N/A"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Show More Button */}
      {sites.length >= 4 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-300"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TourSiteList;