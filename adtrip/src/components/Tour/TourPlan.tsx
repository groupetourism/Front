import React, { useState } from "react";
import TourSiteList from "../../components/SiteList/TourSiteList"; // Import the new component

interface Tour {
  id: number;
  user_id: number;
  site_id: number;
  accommodation_id: number | null;
  vehicle_id: number | null;
  start_date: string;
  end_date: string;
}
// Mock data for sites, accommodations, and vehicles
const mockSites = [
  { id: 1, name: "Mountains", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Beach", image: "https://via.placeholder.com/150" },
  { id: 3, name: "City", image: "https://via.placeholder.com/150" },
];

// Mock data for accommodations and vehicles
const mockAccommodations = [
  { id: 1, name: "Hotel A" },
  { id: 2, name: "Hotel B" },
  { id: 3, name: "Hotel C" },
];

const mockVehicles = [
  { id: 1, name: "Car X" },
  { id: 2, name: "Car Y" },
  { id: 3, name: "Car Z" },
];

const TourPlan: React.FC = () => {
  // Mock data for tours
  const [tours, setTours] = useState<Tour[]>([
    {
      id: 1,
      user_id: 1,
      site_id: 1,
      accommodation_id: 1,
      vehicle_id: 1,
      start_date: "2023-10-15",
      end_date: "2023-10-17",
    },
    {
      id: 2,
      user_id: 1,
      site_id: 2,
      accommodation_id: 2,
      vehicle_id: null,
      start_date: "2023-11-01",
      end_date: "2023-11-05",
    },
  ]);

  // State for the new tour form
  const [newTour, setNewTour] = useState({
    site_id: "",
    accommodation_id: "",
    vehicle_id: "",
    start_date: "",
    end_date: "",
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTour({ ...newTour, [name]: value });
  };

  // Handle form submission (mock logic for now)
  const handleCreateTour = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Tour created! (Mock functionality)");
    setNewTour({
      site_id: "",
      accommodation_id: "",
      vehicle_id: "",
      start_date: "",
      end_date: "",
    });
  };

  // Handle delete tour (mock logic for now)
  const handleDeleteTour = (id: number) => {
    alert(`Tour with ID ${id} deleted! (Mock functionality)`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-orange-500">Tour Plans</h1>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side: Planning Form */}
        <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-black">Create a New Tour</h2>
          <form onSubmit={handleCreateTour} className="space-y-4">
            {/* Site Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Site</label>
              <select
                name="site_id"
                value={newTour.site_id}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="">Select a site</option>
                {/* Sites are now fetched dynamically via TourSiteList */}
              </select>
            </div>

            {/* Accommodation Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Accommodation</label>
              <select
                name="accommodation_id"
                value={newTour.accommodation_id}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select an accommodation</option>
                {mockAccommodations.map((accommodation) => (
                  <option key={accommodation.id} value={accommodation.id}>
                    {accommodation.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Vehicle Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Vehicle</label>
              <select
                name="vehicle_id"
                value={newTour.vehicle_id}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select a vehicle</option>
                {mockVehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                name="start_date"
                value={newTour.start_date}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                name="end_date"
                value={newTour.end_date}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300"
            >
              Create Tour
            </button>
          </form>
        </div>

            {/* Right Side: All Sites */}
            <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-black">All Sites</h2>
            <TourSiteList />
            </div>
        </div>

      {/* Planned Tours Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-black">Planned Tours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tours.map((tour) => {
            const site = mockSites.find((s) => s.id === tour.site_id);
            const accommodation = mockAccommodations.find((a) => a.id === tour.accommodation_id);
            const vehicle = mockVehicles.find((v) => v.id === tour.vehicle_id);

            return (
              <div key={tour.id} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-black">{site?.name}</h2>
                <p className="text-gray-600">
                  Accommodation: {accommodation ? accommodation.name : "None"}
                </p>
                <p className="text-gray-600">Vehicle: {vehicle ? vehicle.name : "None"}</p>
                <p className="text-sm text-gray-500">
                  {new Date(tour.start_date).toLocaleDateString()} -{" "}
                  {new Date(tour.end_date).toLocaleDateString()}
                </p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => alert(`Edit tour with ID ${tour.id} (Mock functionality)`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTour(tour.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TourPlan;