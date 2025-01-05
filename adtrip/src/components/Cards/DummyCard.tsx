import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";
import Next from "/Next.png"; // Path to your next arrow icon
import Previous from "/Previous.png"; // Path to your previous arrow icon

interface CardData {
  id: number;
  imageUrl: string;
  name: string;
  review: string;
}

// Custom Next Arrow
const NextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full cursor-pointer hover:opacity-75 z-10"
    >
      <img
        src={Next}
        className="w-6 h-6" // Adjusted arrow size
        alt="Next"
      />
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
      <img
        src={Previous}
        className="w-6 h-6" // Adjusted arrow size
        alt="Previous"
      />
    </div>
  );
};

const DummyCards: React.FC = () => {
  const sliderRef = useRef<Slider>(null); // Reference to the slider
  const [isPlaying, setIsPlaying] = useState(true); // State to track autoplay status

  const [cards] = useState<CardData[]>([
    {
      id: 1,
      imageUrl: "carte.jpg",
      name: "Eiffel Tower",
      review: "A stunning landmark with incredible views. A must-visit!",
    },
    {
      id: 2,
      imageUrl: "https://via.placeholder.com/150",
      name: "Mount Kilimanjaro",
      review: "An amazing hiking experience with breathtaking scenery.",
    },
    {
      id: 3,
      imageUrl: "https://via.placeholder.com/150",
      name: "Great Barrier Reef",
      review: "A paradise for snorkelers and divers. Unforgettable!",
    },
    {
      id: 4,
      imageUrl: "africa.jpg",
      name: "Sahara Desert",
      review: "An endless sea of sand with mesmerizing sunsets.",
    },
  ]);

  // React Slick settings
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
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
    }, 4000); // Adjust timing: 4 seconds play, 4 seconds pause

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isPlaying]);

  return (
    <div className="px-4 py-6 text-black relative">
      <Slider ref={sliderRef} {...settings}>
        {cards.map((card) => (
          <div key={card.id} className="px-2">
            <Card
              imageUrl={card.imageUrl}
              name={card.name}
              review={card.review}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DummyCards;
