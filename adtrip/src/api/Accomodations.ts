import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

// Interface for Accommodation data
export interface AccommodationData {
  id: number;
  department_id: number;
  type: number; // 1: hotel, 2: resto, 3: loisir, 4: hopital, 5: agence voyage, 6: auberge
  name: string;
  description: string | null;
  latitude: number;
  longitude: number;
  promoter: string | null;
  number_of_stars: number | null;
  number_of_rooms: number | null;
  number_of_beds: number | null;
  restaurant_capacity: number | null;
  bar_capacity: number | null;
  conference_room_capacity: number | null;
  capacity: number | null;
  parking: boolean | null;
  is_public: boolean | null;
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

// Fetch all accommodations
export const fetchAccommodations = async (): Promise<ApiResponse> => {
  try {
    console.log("Fetching accommodations...");
    const response = await api.get("/accommodations");
    console.log("Accommodations fetched successfully:", response.data);
    return { data: response.data.data }; // Return the `data` array from the response
  } catch (error: any) {
    console.error("Error fetching accommodations:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      error:
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to fetch accommodations",
    };
  }
};

// Fetching unique accommodation by it's ID
export const fetchAccommodationById = async (id: number): Promise<ApiResponse> => {
  try {
    console.log(`Fetching accommodation with ID ${id}...`);
    const response = await api.get(`/accommodations/${id}`);
    console.log("Accommodation fetched successfully:", response.data);
    return { data: response.data.data }; // Return the `data` object from the response
  } catch (error: any) {
    console.error("Error fetching accommodation:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      error:
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to fetch accommodation",
    };
  }
};