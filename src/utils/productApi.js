// src/utils/productApi.js
import apiClient from "./apiClient";

// Get all products
export const getProducts = () => apiClient.get("/products");

// Get single product
export const getProductById = (id) => apiClient.get(`/products/${id}`);

// Create product
export const createProduct = (product) => apiClient.post("/products", product);

// Update product
export const updateProduct = (id, product) => apiClient.put(`/products/${id}`, product);

// Delete product
export const deleteProduct = (id) => apiClient.delete(`/products/${id}`);
