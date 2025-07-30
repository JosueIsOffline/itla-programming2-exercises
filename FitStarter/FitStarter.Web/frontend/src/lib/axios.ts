import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5292/api",
  timeout: 10000,
});

// Request interceptor to add auth token
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
  },
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear auth data
      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser");
      // Redirect to login page
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  },
);

export default api;
