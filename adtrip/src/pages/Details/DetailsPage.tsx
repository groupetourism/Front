import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import coverImage from "/cover.jpg";
import SearchBar from "../../components/Search/Search";
import SiteDetails from "../../components/Details/Sites/SiteDetails";
import AccommodationDetails from "../../components/Details/Accomodations/AccomodationDetails";

const DetailsPage: React.FC = () => {
  // Extract the type and id from the URL
  const { type, id } = useParams<{ type: string; id: string }>();

  // Validate the type
  const isValidType = type === "sites" || type === "accommodations";

  return (
    <>
      {/* Full Page Wrapper */}
      <div className="relative w-full h-auto bg-slate-100">
        {/* Navbar */}
        <NavBar />

        {/* Hero Section */}
        <div className="relative w-full top-0 left-0 h-[60vh] sm:h-[70vh] lg:h-[80vh]">
          {/* Cover Image */}
          <img
            className="w-full h-full object-cover"
            src={coverImage}
            alt="Cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
            <div className="text-center text-white px-6">
              <h1 className="text-3xl md:text-5xl font-bold">
                Discover Beautiful Destinations
              </h1>
              <p className="mt-4 text-sm md:text-base">
                Plan your next adventure with Adtrip.
              </p>
              {/* Call-to-Action Button */}
              <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition">
                Plan a Trip
              </button>
            </div>
          </div>

          {/* SearchBar Section */}
          <section className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl z-10">
            <SearchBar />
          </section>
        </div>

        {/* Dynamic Details Section */}
        <section className="py-10 px-6 sm:px-6 lg:px-8">
          {isValidType ? (
            <>
              {type === "sites" && <SiteDetails/>}
              {type === "accommodations" && <AccommodationDetails/>}
            </>
          ) : (
            <div className="text-center text-red-500 text-xl">
              Invalid detail type. Please check the URL.
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default DetailsPage;