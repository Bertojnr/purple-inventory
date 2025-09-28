// src/utils/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://inventory-backend-62vj.onrender.com/api/v1", // backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add token automatically if using auth
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // adjust if you store it differently
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
