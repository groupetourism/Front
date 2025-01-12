import React, { useEffect, useState } from "react";
import { fetchEventById, EventData } from "../../../api/Events"; // Adjust the import path as needed
import NavBar from "../../NavBar/NavBar";
import { useLocation } from "react-router-dom"; 

interface EventDetailsProps {
  eventId: string; // eventId is always a string
}
interface LocationState {
  imageUrl: string;
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventId }) => {
  const [event, setEvent] = useState<EventData | null>(null);
  const location = useLocation(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
   const imageUrl = (location.state as LocationState)?.imageUrl ||"/cover.jpg"; // Get the image URL from location state

  
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetchEventById(parseInt(eventId));
        setEvent(response.data);
      } catch (err) {
        setError("Failed to fetch event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  // Function to format the date in a modern style
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short", // Abbreviated month name (e.g., "Oct")
      day: "numeric", // Day of the month (e.g., "25")
      year: "numeric", // Full year (e.g., "2023")
    }).format(date);
  };

  // Utility function to parse and format time
  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric", // Hour (e.g., "10")
      minute: "numeric", // Minute (e.g., "00")
      hour12: true, // Use 12-hour format (e.g., "AM" or "PM")
    }).format(date);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="relative w-full h-auto bg-slate-100">
      <NavBar />
      {/* Cover Image */}
      <div className="relative w-full h-96">
        <img
          src={imageUrl}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        {/* Overlay with Event Name and Description */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
          <h1 className="text-4xl font-bold text-white">{event.name}</h1>
          <p className="text-lg text-white mt-2">{event.description}</p>
        </div>

        {/* Mini Card with Date, Time, and Ticket Price */}
        <div className="absolute top-1/2 -translate-y-1/2 right-6 bg-white p-4 rounded-lg shadow-md z-10 w-64">
          <div className="flex flex-col space-y-2">
            {/* Date Section */}
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {formatDate(event.start_date)} - {formatDate(event.end_date)}
              </p>
              <p className="text-xs text-gray-600">
                Time: {formatTime(event.start_date)} - {formatTime(event.end_date)}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Ticket Price Section */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-800">Ticket Price:</p>
              <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm">
                ${event.ticket_price}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Details</h2>
            <p className="text-gray-700 mb-6">{event.description}</p>

            {/* Additional Details */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Location:</p>
                  <p className="text-gray-700"></p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Organizer:</p>
                  <p className="text-gray-700"></p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Category:</p>
                  <p className="text-gray-700"></p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section (Empty Space for Now) */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Event Location</h3>
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Map will go here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;