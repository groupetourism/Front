import React, { useState } from "react";
import { FaCalendarAlt, FaStar, FaUtensils, FaFlag, FaEllipsisH } from "react-icons/fa";
import NavBar from "../../components/NavBar/NavBar";
import coverImage from "/cover.jpg";
import SearchBar from "../../components/Search/Search";
import EventList from "../../components/Events/EventList";
import EventCalendar from "../../components/Events/EventCalender"; // Import the EventCalendar component
import { useUser } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"; 
const EventPage: React.FC = () => {
  // State for active menu item
  const [activeItem, setActiveItem] = useState("all");
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const handlePlanTrip = () => {
    if (user) {
      // Navigate to the Plans Page
      navigate("/plans");
    } else {
      alert("Please login first");
      // Optionally, navigate to the Login Page
      navigate("/login");
    }
  };
  // Menu items
  const menuItems = [
    { id: "all", label: "All", icon: <FaStar className="text-orange-500" /> },
    { id: "festivals", label: "Festivals", icon: <FaCalendarAlt className="text-orange-500" /> },
    { id: "food", label: "Food", icon: <FaUtensils className="text-orange-500" /> },
    { id: "national", label: "National", icon: <FaFlag className="text-orange-500" /> },
    { id: "more", label: "More", icon: <FaEllipsisH className="text-orange-500" /> },
  ];

  return (
    <>
      {/* Full Page Wrapper */}
      <div className="relative w-full h-auto bg-gradient-to-b from-slate-50 to-slate-100">
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 flex flex-col items-center justify-center">
            <div className="text-center text-white px-6">
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-orange-400">
                Discover Events Like a Local
              </h1>
              <p className="mt-4 text-sm md:text-base text-slate-200">
                Plan your next adventure with Adtrip.
              </p>
              {/* Call-to-Action Button */}
              <button 
              onClick={handlePlanTrip}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-orange-300 to-orange-400 text-white font-semibold rounded-full shadow-lg hover:from-orange-600 hover:to-orange-700 transition duration-300">
                Plan a Trip
              </button>
            </div>
          </div>

          {/* SearchBar Section */}
          <section className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl z-10">
            <SearchBar />
          </section>
        </div>

        {/* Upcoming Events Section */}
        <section className="flex justify-center items-center mt-16 w-full p-8">
          <div className="text-center">
            {/* Title */}
            <p className="text-4xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-orange-400">
                Upcoming
              </span>{" "}
              <span className="text-slate-800">Events</span>
            </p>

            {/* Calendar Icon and Line */}
            <div className="relative mt-4">
              {/* Line */}
              <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>

              {/* Calendar Icon */}
              <div className="relative flex justify-center">
                <FaCalendarAlt className="text-orange-500 text-3xl bg-slate-100 p-2 rounded-full shadow-md" /> {/* Calendar Icon */}
              </div>
            </div>
          </div>
        </section>

        {/* Little Menu Section */}
        <section className="flex justify-center w-full mt-8 px-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-2 w-full max-w-4xl overflow-x-auto">
            <ul className="flex justify-center space-x-6 text-sm sm:text-base">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer transition duration-300 ${
                    activeItem === item.id
                      ? "bg-orange-100 text-orange-400"
                      : "bg-orange/50 hover:bg-orange-50 text-slate-700"
                  }`}
                  onClick={() => setActiveItem(item.id)}
                >
                  <div className="flex items-center justify-center w-10 h-10">
                    {item.icon}
                  </div>
                  <span className="mt-1 text-sm font-medium">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Event List and Calendar Section */}
        <section className="flex flex-col lg:flex-row w-full p-8 gap-8">
          {/* Left Side: Event List */}
          <div className="w-full lg:w-2/3">
            <EventList />
          </div>

          {/* Right Side: Calendar Container */}
          <div className="w-full lg:w-1/3">
            <EventCalendar /> {/* Replace placeholder with EventCalendar */}
          </div>
        </section>

      {/* More Events Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">More Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Empty space for more events */}
        </div>
      </div>
      </div>
    </>
  );
};

export default EventPage;