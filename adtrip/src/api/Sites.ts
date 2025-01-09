import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

// Interface for Site data
export interface SiteData {
  id: number;
  name: string;
  description: string | null;
  latitude: number;
  longitude: number;
  visite_periode: string | null;
  access_means: string | null;
  offered_service: string | null;
  cultural_info: string | null;
  ticket_price: number | null;
  image: string | null;
  contact_info: string | null;
  website: string | null;
  department: {
    id: number;
    name: string;
  } | null;
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

// Fetch a single site by ID
export const fetchSiteById = async (id: number): Promise<ApiResponse> => {
  try {
    console.log(`Fetching site with ID: ${id}...`);
    const response = await api.get(`/sites/${id}`);
    console.log("Site fetched successfully:", response.data);
    return { data: response.data.data }; // Return the `data` object from the response
  } catch (error: any) {
    console.error("Error fetching site:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      error:
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to fetch site",
    };
  }
};