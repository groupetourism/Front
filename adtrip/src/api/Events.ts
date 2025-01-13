import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

// Interface for Event data
export interface EventData {
  id: number;
  department_id: number;
  site_id: number;
  name: string;
  description: string;
  ticket_price: number;
  start_date: string;
  end_date: string;
  image: string;
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

// Fetch all events
export const fetchEvents = async (): Promise<ApiResponse> => {
  try {
    console.log("Fetching events...");
    const response = await api.get("/events");
    console.log("Events fetched successfully:", response.data);
    return { data: response.data.data }; // Return the `data` array from the response
  } catch (error: any) {
    console.error("Error fetching events:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      error:
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to fetch events",
    };
  }
};

// Fetch event by ID
export const fetchEventById = async (id: number): Promise<ApiResponse> => {
  try {
    console.log(`Fetching event with ID: ${id}...`);
    const response = await api.get(`/events/${id}`);
    console.log("Event fetched successfully:", response.data);
    return { data: response.data.data }; // Return the `data` object from the response
  } catch (error: any) {
    console.error("Error fetching event:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      error:
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to fetch event",
    };
  }
};