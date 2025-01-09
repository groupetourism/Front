// Modify this file to match accomodations so it could be used to implement the api call 
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

// Interface for Department data
export interface DepartmentData {
  id: number;
  name: string;
  surface_area: number;
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

// Fetch all departments
export const fetchDepartments = async (): Promise<ApiResponse> => {
  try {
    console.log("Fetching departments...");
    const response = await api.get("/departments");
    console.log("Departments fetched successfully:", response.data);
    return { data: response.data.data }; // Return the `data` array from the response
  } catch (error: any) {
    console.error("Error fetching departments:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      error:
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to fetch departments",
    };
  }
};