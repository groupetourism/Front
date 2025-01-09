import React, { useEffect, useState } from "react";
import SiteCard from "./SiteCard";
import { SiteData, fetchSites } from "../../api/Sites";

const SiteList: React.FC = () => {
  const [sites, setSites] = useState<SiteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleSites, setVisibleSites] = useState(15); // Number of sites to display
 

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await fetchSites();
      if (data) {
        setSites(data);
        setLoading(false);
      } else if (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Limit the number of sites to `visibleSites`
  const limitedSites = sites.slice(0, visibleSites);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {limitedSites.map((site) => (
          <SiteCard
            key={site.id}
            id={site.id}
            name={site.name}
            imageUrl={site.image}
            
          />
        ))}
      </div>
      {sites.length > visibleSites && (
        <div className="flex justify-center mt-4">
          {/* Add a "Load More" button if needed */}
        </div>
      )}
    </div>
  );
};

export default SiteList;