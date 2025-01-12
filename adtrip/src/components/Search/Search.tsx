import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);
  const navigate = useNavigate(); // Use the navigate function

  // Debounce function to limit API calls
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Function to fetch all data (accommodations, events, sites)
  const fetchAllData = async () => {
    try {
      const [accommodationsResponse, eventsResponse, sitesResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/accommodations`),
        axios.get(`${API_BASE_URL}/events`),
        axios.get(`${API_BASE_URL}/sites`),
      ]);

      // Combine all results into a single array and add a `type` property
      const combinedResults = [
        ...(accommodationsResponse.data.data?.map((result: any) => ({ ...result, type: "accommodation" })) || []),
        ...(eventsResponse.data.data?.map((result: any) => ({ ...result, type: "event" })) || []),
        ...(sitesResponse.data.data?.map((result: any) => ({ ...result, type: "site" })) || []),
      ];

      return combinedResults;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch data");
      return [];
    }
  };

  // Function to filter results based on the search term
  const filterResults = (results: any[], query: string) => {
    if (!query.trim()) return []; // Return empty array if query is empty

    return results.filter((result) =>
      result.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Debounced search function
  const debouncedSearch = React.useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        setIsDropdownOpen(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const allData = await fetchAllData();
        const filteredResults = filterResults(allData, query);
        setSearchResults(filteredResults);
        setIsDropdownOpen(true);
      } catch (err: any) {
        setError(err.message || "Failed to filter results");
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value); // Trigger debounced search
  };

  const handleClear = () => {
    setSearchTerm("");
    setSearchResults([]);
    setError(null);
    setIsDropdownOpen(false);
  };

  // Handle click on a search result
  const handleResultClick = (result: any) => {
    if (result.type === "site") {
      navigate(`/details/sites/${result.id}`); // Navigate to site details page
    } else if (result.type === "accommodation") {
      navigate(`/details/accommodations/${result.id}`); // Navigate to accommodation details page
    }
    setIsDropdownOpen(false); // Close the dropdown
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchBarContainer = document.querySelector(".search-bar-container");
      if (searchBarContainer && !searchBarContainer.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-full p-4 -mt-10 relative search-bar-container">
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
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              debouncedSearch(searchTerm);
            }
          }}
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
          onClick={() => debouncedSearch(searchTerm)}
          disabled={isLoading}
          className="ml-2 sm:ml-3 px-4 sm:px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base font-semibold rounded-lg shadow-md transition-colors duration-200 flex items-center"
        >
          {isLoading ? (
            "Searching..."
          ) : (
            <>
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
            </>
          )}
        </button>
      </div>

      {/* Dropdown for Search Results */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 w-full max-w-[90%] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {isLoading ? (
            <p className="p-4 text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="p-4 text-center text-red-500">{error}</p>
          ) : searchResults.length > 0 ? (
            <ul className="max-h-60 overflow-y-auto">
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  onClick={() => handleResultClick(result)} // Add onClick handler
                  className="p-4 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                >
                  <h3 className="font-semibold">{result.name}</h3> {/* Only display the name */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-center text-gray-500">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;