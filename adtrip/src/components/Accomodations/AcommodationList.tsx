import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AcommodationCard from "./AcommodationCard";
import Next from "/Next.png";
import Previous from "/Previous.png";
interface CardData {
  id: number;
  imageUrl: string;
  name: string;
  review: string;
  rating: number;
}

// Custom Next Arrow
const NextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-transparent bg-opacity-50 text-white -p-3 rounded-full cursor-pointer  hover:bg-opacity-75 z-10 "
    >
     <img src={Next} 
     className="w-6 h-6 "
     alt="" />
    </div>
  );
};

// Custom Previous Arrow
const PrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 left-0 transform -translate-y-1/2bg-opacity-50 text-white -p-3 rounded-full cursor-pointer hover:bg-opacity-75 z-10"
    >
      <img src={Previous}
      className="w-6 h-6" alt="" />
    </div>
  );
};

const AccomodationsList: React.FC = () => {
  const sliderRef = useRef<Slider>(null); // Reference to the slider
  const [isPlaying, setIsPlaying] = useState(true); // State to track autoplay status

  const [cards] = useState<CardData[]>([
    {
      id: 1,
      imageUrl: "carte.jpg",
      name: "Karl'Inn",
      review: "A cozy inn with breathtaking views of the Eiffel Tower.",
      rating: 5,
    },
    {
      id: 2,
      imageUrl: "https://via.placeholder.com/150",
      name: "Kilimanjaro Lodge",
      review: "An amazing lodge at the base of Mount Kilimanjaro.",
      rating: 4,
    },
    {
      id: 3,
      imageUrl: "https://via.placeholder.com/150",
      name: "Barrier Reef Resort",
      review: "Perfect for snorkelers and divers seeking adventure.",
      rating: 5,
    },
    {
      id: 4,
      imageUrl: "africa.jpg",
      name: "Sahara Desert Camp",
      review: "Experience stunning desert sunsets at this luxury camp.",
      rating: 3,
    },
  ]);

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

  return (
    <div className="px-4 py-6 text-black relative">
      <Slider ref={sliderRef} {...settings}>
        {cards.map((card) => (
          <div key={card.id} className="px-2">
            <AcommodationCard
              imageUrl={card.imageUrl}
              name={card.name}
              rating={card.rating}
              description={card.review}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AccomodationsList;
