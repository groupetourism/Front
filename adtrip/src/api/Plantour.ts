import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

// Interface for Tour data
export interface TourData {
  user_id: number;
  site_id: number;
  start_date: string; // Format: "YYYY-MM-DD HH:mm:ss"
  end_date: string; // Format: "YYYY-MM-DD HH:mm:ss"
}

// Interface for API response
export interface ApiResponse {
  data?: any;
  error?: string;
}

// Creating an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Get the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the request headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Create a new tour
export const createTour = async (tourData: TourData): Promise<ApiResponse> => {
  try {
    console.log("Sending tour data:", tourData); // Log the payload
    const response = await api.post("/tour-plans", tourData);
    console.log("Tour created successfully:", response.data); // Log the response

    // Ensure the response has the expected structure
    if (response.data && response.data.data) {
      return { data: response.data.data }; // Return the created tour data
    } else {
      throw new Error("Unexpected response structure from createTour");
    }
  } catch (error: any) {
    console.error("API Error:", error.response?.data); // Log the error response
    return {
      error:
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to create tour",
    };
  }
};
// Fetch all tours for the logged-in user
export const fetchTours = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get("/tour-plans");

    console.log("API Response:", response);

    // Log the nested data structure
    console.log("Response Data:", response.data);
    console.log("Response Data Data:", response.data.data);
    // Log the raw API response
    console.log("API Response:", response);

    // Log the nested data structure
    console.log("Response Data:", response.data);
    console.log("Response Data Data:", response.data.data);

    // Ensure the response has the expected structure
    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      return { data: response.data.data }; // Return the nested `data` array
    } else {
      throw new Error("Unexpected response structure for tours");
    }
  } catch (error: any) {
    console.error("Failed to fetch tours:", error);
    return {
      error:
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to fetch tours",
    };
  }
};
// Delete a tour
export const deleteTour = async (tourId: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete(`/tour-plans/${tourId}`);
    return { data: response.data };
  } catch (error: any) {
    return {
      error:
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to delete tour",
    };
  }
};