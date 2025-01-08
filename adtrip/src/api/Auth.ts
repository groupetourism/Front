import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

interface LoginCredentials {
  email: string;
  password: string;
  phone:string;
}

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

// Sign-up API call
export const signUp = async (userData: UserData): Promise<ApiResponse> => {
  try {
    console.log("Sending sign-up request with data:", userData); // Log request data
    const response = await api.post("/users", userData);
    console.log("Sign-up API response:", response.data); // Log successful response
    return { data: response.data };
  } catch (error: any) {
    console.error("Sign-up API error:", {
      message: error.message, // Log the error message
      response: error.response?.data, // Log the response data from the API
      status: error.response?.status, // Log the HTTP status code
      headers: error.response?.headers, // Log response headers
      request: error.request, // Log request details
    });
    return {
      error:
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Sign-up failed",
    };
  }
};

// Login API call
export const login = async (credentials: LoginCredentials): Promise<ApiResponse> => {
  try {
    console.log("Sending login request with data:", credentials); // Log request data
    const response = await api.post("/login", credentials);
    console.log("Login API response:", response.data); // Log successful response
    return { data: response.data };
  } catch (error: any) {
    console.error("Login API error:", {
      message: error.message, // Log the error message
      response: error.response?.data, // Log the response data from the API
      status: error.response?.status, // Log the HTTP status code
      headers: error.response?.headers, // Log response headers
      request: error.request, // Log request details
    });
    return {
      error:
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed",
    };
  }
};