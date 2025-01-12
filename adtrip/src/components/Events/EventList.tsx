import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EventCard from "./EventCard";
import Next from "/Next.png";
import Previous from "/Previous.png";
import { EventData, fetchEvents } from "../../api/Events";

// Dummy image data structure
const eventImages = {
  1: "/events/event1.jpg",
  2: "/events/event2.jpg",
  3: "/events/event3.jpg",
  4: "/events/event4.jpg",
  5: "/events/event5.jpg",
  6: "/events/event6.jpg",
};

// Custom Next Arrow
const NextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full cursor-pointer hover:opacity-75 z-10"
    >
      <img src={Next} className="w-6 h-6" alt="Next" />
    </div>
  );
};

// Custom Previous Arrow
const PrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full cursor-pointer hover:opacity-75 z-10"
    >
      <img src={Previous} className="w-6 h-6" alt="Previous" />
    </div>
  );
};

const EventList: React.FC = () => {
  const sliderRef = useRef<Slider>(null);
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await fetchEvents();
      if (data) {
        setEvents(data);
        setLoading(false);
      } else if (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // React Slick settings
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="px-4 py-6 text-black relative">
      <Slider ref={sliderRef} {...settings}>
        {events.map((event) => (
          <div key={event.id} className="px-2">
            <EventCard
              id={event.id} // Pass the event id
              name={event.name}
              description={event.description}
              ticket_price={event.ticket_price}
              start_date={event.start_date}
              end_date={event.end_date}
              imageUrl={eventImages[event.id as keyof typeof eventImages]}  // Dynamically assign the image path
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default EventList;