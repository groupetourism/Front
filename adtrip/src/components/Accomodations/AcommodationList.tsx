import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AccommodationCard from "./AcommodationCard";
import Next from "/Next.png";
import Previous from "/Previous.png";
import { AccommodationData, fetchAccommodations } from "../../api/Accomodations";

// Custom Next Arrow
const NextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-transparent bg-opacity-50 text-white -p-3 rounded-full cursor-pointer  hover:bg-opacity-75 z-10 "
    >
      <img src={Next} className="w-6 h-6" alt="" />
    </div>
  );
};

// Custom Previous Arrow
const PrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-opacity-50 text-white -p-3 rounded-full cursor-pointer hover:bg-opacity-75 z-10"
    >
      <img src={Previous} className="w-6 h-6" alt="" />
    </div>
  );
};

const AccommodationsList: React.FC = () => {
  const sliderRef = useRef<Slider>(null); // Reference to the slider
  const [isPlaying, setIsPlaying] = useState(true); // State to track autoplay status
  const [accommodations, setAccommodations] = useState<AccommodationData[]>([]); // State for accommodations
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState<string | null>(null); // State for error

  // Fetch accommodations from the API
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await fetchAccommodations();
      if (data) {
        setAccommodations(data);
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
    speed: 1000, // Transition speed
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
          infinite: true,
          dots: true,
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

  // Autoplay toggle effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        sliderRef.current?.slickPause();
        setIsPlaying(false);
      } else {
        sliderRef.current?.slickPlay();
        setIsPlaying(true);
      }
    }, 4000); // Adjust timing: 4 seconds play, 4 seconds stop

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isPlaying]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="px-4 py-6 text-black relative">
      <Slider ref={sliderRef} {...settings}>
        {accommodations.map((accommodation) => (
          <div key={accommodation.id} className="px-2">
            <AccommodationCard
              image={accommodation.image}
              name={accommodation.name}
              description={accommodation.description}
              number_of_stars={accommodation.number_of_stars}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AccommodationsList;