import React from "react";
import SitePassCard from "./SitePassCard"; // Import the updated SitePassCard

const SitePassList: React.FC = () => {
  const sitePasses = [
    {
      name: "Mount Cameroon Adventure",
      imageUrl: "africa.jpg",
      description: "An exciting hike to the summit of Mount Cameroon.",
      price: "$50",
    },
    {
      name: "Waza National Park Safari",
      imageUrl: "africa.jpg",
      description: "Explore the wildlife and landscapes of Waza National Park.",
      price: "$80",
    },
    {
      name: "Kribi Beach Relaxation",
      imageUrl: "africa.jpg",
      description: "Relax at the beautiful beaches of Kribi.",
      price: "$40",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sitePasses.map((site, index) => (
        <SitePassCard
          key={index}
          name={site.name}
          imageUrl={site.imageUrl}
          description={site.description}
          price={site.price}
        />
      ))}
    </div>
  );
};

export default SitePassList;
