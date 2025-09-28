// src/utils/api.js
import apiClient from "./apiClient";

// --- Supplier APIs ---
export const getSuppliers = () => apiClient.get("/suppliers");
export const getSupplierById = (id) => apiClient.get(`/suppliers/${id}`);
export const createSupplier = (supplier) => apiClient.post("/suppliers", supplier);
export const updateSupplier = (id, supplier) => apiClient.put(`/suppliers/${id}`, supplier);
export const deleteSupplier = (id) => apiClient.delete(`/suppliers/${id}`);

// --- Product APIs ---
export const getProducts = () => apiClient.get("/products");
export const getProductById = (id) => apiClient.get(`/products/${id}`);
export const createProduct = (product) => apiClient.post("/products", product);
export const updateProduct = (id, product) => apiClient.put(`/products/${id}`, product);
export const deleteProduct = (id) => apiClient.delete(`/products/${id}`);

// --- Transactions ---
export const getTransactions = () => apiClient.get("/transactions");
export const getTransactionById = (id) => apiClient.get(`/transactions/${id}`);
export const createTransaction = (transaction) => apiClient.post("/transactions", transaction);
export const updateTransaction = (id, transaction) => apiClient.put(`/transactions/${id}`, transaction);
export const deleteTransaction = (id) => apiClient.delete(`/transactions/${id}`);
