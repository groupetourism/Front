import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

// Interface for Site data
export interface SiteData {
  id: number;
  name: string;
  description: string | null;
  latitude: number;
  longitude: number;
  opening_hours: Record<string, any>; // JSON object
  ticket_price: number | null;
  image: string | null;
  contact_info: string | null;
  website: string | null;
  created_at: string;
  updated_at: string;
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

// Fetch all sites
export const fetchSites = async (): Promise<ApiResponse> => {
    try {
      console.log("Fetching sites...");
      const response = await api.get("/sites");
      console.log("Sites fetched successfully:", response.data);
      return { data: response.data.data }; // Return the `data` array from the response
    } catch (error: any) {
      console.error("Error fetching sites:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      return {
        error:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to fetch sites",
      };
    }
  };