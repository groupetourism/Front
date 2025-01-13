import React, { useEffect, useState } from "react";
import { useUser } from "../../context/AuthContext";
import { fetchSites } from "../../api/Sites";
import { createTour, fetchTours, deleteTour } from "../../api/Plantour";

interface Tour {
  id: number;
  user_id: number;
  site_id: number;
  accommodation_id: number;
  vehicle_id: number;
  start_date: string;
  end_date: string;
  user: {
    id: number;
    lastname: string;
    firstname: string;
    phone: string;
    email: string;
    is_admin: boolean;
  };
  site: {
    id: number;
    department_id: number;
    name: string;
    description: string;
    latitude: string;
    longitude: string;
    visite_periode: string;
    access_means: string;
    offered_service: string;
    cultural_info: string | null;
    ticket_price: string | null;
    image: string;
    contact_info: string | null;
    website: string | null;
  };
}

interface Site {
  id: number;
  name: string;
}

const TourPlan: React.FC = () => {
  const { user } = useUser();
  const [sites, setSites] = useState<Site[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for the new tour form
  const [newTour, setNewTour] = useState({
    site_id: "",
    start_date: "",
    end_date: "",
  });

  // Fetch sites and tours on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all sites
        const sitesResponse = await fetchSites();
        if (sitesResponse.error) {
          throw new Error(sitesResponse.error);
        }
  
        // Set sites directly from the response
        if (sitesResponse.data && Array.isArray(sitesResponse.data)) {
          setSites(sitesResponse.data);
        } else {
          throw new Error("Unexpected response structure for sites");
        }
  
        // Fetch tours
        const toursResponse = await fetchTours(); // No need to pass user ID
        if (toursResponse.error) {
          throw new Error(toursResponse.error);
        }
  
        // Set tours directly from the response
        if (toursResponse.data && Array.isArray(toursResponse.data)) {
          setTours(toursResponse.data);
        } else {
          throw new Error("Unexpected response structure for tours");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [user]);
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTour({ ...newTour, [name]: value });
  };

  // Handle form submission
  const handleCreateTour = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!user) {
      setError("User not logged in.");
      return;
    }
  
    // Validate site_id
    if (!newTour.site_id) {
      setError("Please select a site.");
      return;
    }
  
    // Validate dates
    const startDate = new Date(newTour.start_date);
    const endDate = new Date(newTour.end_date);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      setError("Invalid date format.");
      return;
    }
    if (startDate >= endDate) {
      setError("End date must be after start date.");
      return;
    }
  
    // Prepare payload
    const payload = {
      user_id: user.id,
      site_id: parseInt(newTour.site_id),
      start_date: startDate.toISOString().slice(0, 19).replace("T", " "),
      end_date: endDate.toISOString().slice(0, 19).replace("T", " "),
    };
  
    console.log("Payload:", payload);
  
    try {
      // Create the tour
      const createResponse = await createTour(payload);
      if (createResponse.error) {
        throw new Error(createResponse.error);
      }
  
      // Log the create response
      console.log("Create Tour Response:", createResponse);
  
      // Fetch the updated list of tours
      const toursResponse = await fetchTours();
      if (toursResponse.error) {
        throw new Error(toursResponse.error);
      }
  
      // Log the tours response
      console.log("Fetch Tours Response:", toursResponse);
  
      // Update the tours state with the latest data
      if (toursResponse.data && Array.isArray(toursResponse.data)) {
        setTours(toursResponse.data);
      } else {
        throw new Error("Unexpected response structure for tours");
      }
  
      // Reset the form
      setNewTour({
        site_id: "",
        start_date: "",
        end_date: "",
      });
  
      alert("Tour created successfully!");
    } catch (err: any) {
      setError(err.message);
    }
  };
  // Handle delete tour
  const handleDeleteTour = async (id: number) => {
    try {
      const response = await deleteTour(id);
      if (response.error) {
        throw new Error(response.error);
      }

      // Remove the deleted tour from the list
      setTours(tours.filter((tour) => tour.id !== id));
      alert("Tour deleted successfully!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                {sites.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date and Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date and Time</label>
              <input
                type="datetime-local"
                name="start_date"
                value={newTour.start_date}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            {/* End Date and Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date and Time</label>
              <input
                type="datetime-local"
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

        {/* Right Side: Planned Tours */}
        <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-black">Planned Tours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tours.length > 0 ? (
  tours.map((tour) => {
    // Check if start_date and end_date are defined
    if (!tour.start_date || !tour.end_date) {
      console.warn(`Invalid date for tour ID ${tour.id}`);
      return null;
    }

    const startDate = new Date(tour.start_date.replace(" ", "T"));
    const endDate = new Date(tour.end_date.replace(" ", "T"));

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.warn(`Invalid date for tour ID ${tour.id}`);
      return null;
    }

    return (
      <div key={tour.id} className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-black">{tour.site.name}</h2>
        <p className="text-sm text-gray-500">
          {startDate.toLocaleString()} - {endDate.toLocaleString()}
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
  })
) : (
  <p className="text-gray-500">No tours planned yet.</p>
)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPlan;