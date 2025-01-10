import React from "react";
import { useParams } from "react-router-dom"; // Import useParams to access the event ID
import EventDetails from "../../components/Details/Events/EventDetails";

const EventDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract the event ID from the URL

  // Handle the case where id is undefined
  if (!id) {
    return <div>Event ID is missing. Please check the URL.</div>;
  }

  return (
    <div>
      {/* Pass the event ID to the EventDetails component */}
      <EventDetails eventId={id} />
    </div>
  );
};

export default EventDetailsPage;