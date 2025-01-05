import React from "react";
import SiteCard from "./SiteCard";

const SiteList: React.FC = () => {
  // Dummy data: Tourist sites in Cameroon
  const sites = [
    { name: "Mount Cameroon", imageUrl: "africa.jpg" },
    { name: "Waza National Park", imageUrl: "cover.jpg" },
    { name: "Limbe Botanical Garden", imageUrl: "map.jpg" },
    { name: "Kribi Beach", imageUrl: "cover.jpg" },
    { name: "Dja Faunal Reserve", imageUrl: "cover.jpg" },
    { name: "Ekom-Nkam Waterfalls", imageUrl: "cover.jpg" },
    { name: "Bafut Palace", imageUrl: "cover.jpg" },
    { name: "Lake Nyos", imageUrl: "cover.jpg" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {sites.map((site, index) => (
        <SiteCard key={index} name={site.name} imageUrl={site.imageUrl} />
      ))}
    </div>
  );
};

export default SiteList;
