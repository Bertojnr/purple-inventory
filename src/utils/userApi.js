// src/utils/userApi.js
import apiClient from "./apiClient";

// Authentication
export const login = (credentials) => apiClient.post("/auth/login", credentials);
export const register = (data) => apiClient.post("/auth/register", data);

// User Management (Admin only)
// export const getUsers = () => apiClient.get("/users");
// export const deleteUser = (id) => apiClient.delete(`/users/${id}`);
// 🔹 Get all users
export const getUsers = () => apiClient.get("/users");

// 🔹 Get user by ID
export const getUserById = (id) => apiClient.get(`/users/${id}`);

// 🔹 Create new user
export const createUser = (userData) => apiClient.post("/users", userData);

// 🔹 Update existing user
export const updateUser = (id, userData) => apiClient.put(`/users/${id}`, userData);

// 🔹 Delete user
export const deleteUser = (id) => apiClient.delete(`/users/${id}`);