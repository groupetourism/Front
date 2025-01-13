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
  let allSites: SiteData[] = []; // Array to store all sites
  let currentPage = 1; // Start with the first page
  let lastPage = 1; // Will be updated based on the API response

  try {
    console.log("Fetching sites...");

    // Loop through all pages
    do {
      const response = await api.get("/sites", {
        params: { page: currentPage }, // Pass the current page number
      });

      console.log(`Fetched page ${currentPage}:`, response.data);

      // Add the sites from the current page to the array
      if (response.data && Array.isArray(response.data.data)) {
        allSites = [...allSites, ...response.data.data];
      }

      // Update pagination details
      currentPage = response.data.meta.current_page + 1; // Move to the next page
      lastPage = response.data.meta.last_page; // Update the last page number
    } while (currentPage <= lastPage); // Continue until all pages are fetched

    console.log("All sites fetched successfully:", allSites);
    return { data: allSites }; // Return all sites
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