import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

// Dummy data for testimonials
const testimonials = [
  {
    id: 1,
    name: "John Doe",
    testimony:
      "Adtrip made planning my trip so easy! Highly recommended for anyone looking for a seamless travel experience.",
    rating: 5,
    imageUrl: "./cover.jpg", // Example image URL
  },
  {
    id: 2,
    name: "Jane Smith",
    testimony:
      "The best travel companion I've ever used. The destinations are amazing, and the service is top-notch!",
    rating: 4.5,
    imageUrl: "./cover.jpg", // Example image URL
  },
  {
    id: 3,
    name: "Alex Johnson",
    testimony:
      "Amazing service and great destinations. Will definitely use Adtrip again for my next adventure!",
    rating: 5,
    imageUrl: "./cover.jpg", // Example image URL
  },
];

const Testimonials: React.FC = () => {
  // Function to render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    // Half star
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    // Empty stars (if any)
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <section className="py-10 px-10 sm:px-6 lg:px-8 bg-gray-100">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-8">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
          >
            {/* User Image */}
            <div className="flex justify-center mb-4">
              <img
                src={testimonial.imageUrl}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>

            {/* Testimony */}
            <p className="text-gray-600 text-center mb-4">
              "{testimonial.testimony}"
            </p>

            {/* Star Ratings */}
            <div className="flex justify-center mb-4">
              <div className="flex">{renderStars(testimonial.rating)}</div>
            </div>

            {/* User Name */}
            <p className="text-center font-semibold text-gray-800">
              - {testimonial.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;