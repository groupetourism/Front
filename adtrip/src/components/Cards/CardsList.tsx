import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";
import Next from "/Next.png";
import Previous from "/Previous.png";
import { DepartmentData, fetchDepartments } from "../../api/Departements";

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

const CardsList: React.FC = () => {
  const sliderRef = useRef<Slider>(null); // Reference to the slider
  const [isPlaying, setIsPlaying] = useState(true); // State to track autoplay status
  const [departments, setDepartments] = useState<DepartmentData[]>([]); // Update state to departments
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await fetchDepartments(); // Fetch departments instead of sites
      if (data) {
        setDepartments(data);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="px-4 py-6 text-black relative">
      <Slider ref={sliderRef} {...settings}>
        {departments.map((department) => (
          <div key={department.id} className="px-2">
            <Card
              imageUrl={null}
              name={department.name}
              description={`Surface Area: ${department.surface_area} km²`} // Customize description
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardsList;