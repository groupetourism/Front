import React from "react";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    // Search bar logic will be implemented here when the API is integrated
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="flex justify-center items-center w-full p-4 -mt-10">
      {/* Search Bar Container */}
      <div className="flex items-center bg-white p-3 rounded-lg border border-gray-300 shadow-sm w-full max-w-[90%] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-4xl mx-auto">
        {/* Location Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 mr-2 sm:mr-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for destinations, hotels, or activities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search"
          className="w-full p-2 text-sm sm:text-base text-gray-700 border-none focus:outline-none placeholder-gray-400 italic"
        />

        {/* Clear Button (Visible only when there's text) */}
        {searchTerm && (
          <button
            onClick={handleClear}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="ml-2 sm:ml-3 px-4 sm:px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base font-semibold rounded-lg shadow-md transition-colors duration-200 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;