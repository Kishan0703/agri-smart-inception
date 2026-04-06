// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL2 || "http://localhost:8000",
  timeout: parseInt(process.env.REACT_APP_API_TIMEOUT) || 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ⬇️ ADD THIS — attach token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("farmerToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Making API request to:", config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response debugging
API.interceptors.response.use(
  (response) => {
    console.log("API response received:", response.status);
    return response;
  },
  (error) => {
    console.error("API request failed:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;
