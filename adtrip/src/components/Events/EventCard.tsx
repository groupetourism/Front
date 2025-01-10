import React from "react";

interface EventCardProps {
  name: string;
  description: string;
  ticket_price: number;
  start_date: string;
  end_date: string;
  imageUrl: string;
}

const EventCard: React.FC<EventCardProps> = ({
  name,
  description,
  ticket_price,
  start_date,
  end_date,
  imageUrl,
}) => {
  const imageSrc ="/map.jpg"; // Use the provided image URL or a fallback
  const descriptionFallback = description || "";

  // Function to format the date in a modern style
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short", // Abbreviated month name (e.g., "Oct")
      day: "numeric", // Day of the month (e.g., "25")
      year: "numeric", // Full year (e.g., "2023")
    }).format(date);
  };

  // Format the start and end dates
  const formattedStartDate = formatDate(start_date);
  const formattedEndDate = formatDate(end_date);

  return (
    // Card Main Container
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 w-full h-full flex flex-col">
      {/* Image Section */}
      <div className="relative flex-shrink-0">
        {/* Image */}
        <img
          src={imageSrc}
          alt="Event"
          className="w-full h-48 sm:h-56 object-cover rounded-t-lg"
        />

        {/* Ticket Price Tag (Top Left) */}
        <div className="absolute top-3 left-3 bg-white text-orange-500 text-sm font-semibold px-3 py-1 rounded-full shadow-md">
          ${ticket_price}
        </div>

        {/* Date Section (Bottom Left) */}
        <div className="absolute bottom-3 left-3 bg-white bg-opacity-90 text-gray-800 text-sm px-3 py-2 rounded-md shadow-sm">
          <p className="font-semibold text-orange-500">
            {formattedStartDate} - {formattedEndDate}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Event Name */}
        <h2 className="text-xl font-bold text-gray-900 mb-2">{name}</h2>

        {/* Event Description */}
        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
          {descriptionFallback}
        </p>

        {/* Enroll Button */}
        <div className="mt-auto">
          <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition duration-300 shadow-md">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;