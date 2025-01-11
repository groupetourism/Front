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
  phone: string;
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

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Sign-up API call
export const signUp = async (userData: UserData): Promise<ApiResponse> => {
  try {
    console.log("Sending sign-up request with data:", userData);
    const response = await api.post("/users", userData);
    console.log("Sign-up API response:", response.data);
    return { data: response.data };
  } catch (error: any) {
    console.error("Sign-up API error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
      request: error.request,
    });
    return {
      error:
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Sign-up failed",
    };
  }
};

// Fetch user data based on token and user_id
export const fetchUserData = async (user_id: number, token: string): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/users/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: response.data };
  } catch (error: any) {
    console.error("Failed to fetch user data:", error);
    return {
      error:
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to fetch user data",
    };
  }
};

// Login API call
export const login = async (credentials: LoginCredentials): Promise<ApiResponse> => {
  try {
    console.log("Sending login request with data:", credentials);
    const response = await api.post("/login", credentials);
    console.log("Login API response:", response.data);

    // Ensure the response includes the token and user data
    return {
      data: {
        token: response.data.token,
        user: response.data.user, // Ensure the API returns the user object
      },
    };
  } catch (error: any) {
    console.error("Login API error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
      request: error.request,
    });
    return {
      error:
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed",
    };
  }
};