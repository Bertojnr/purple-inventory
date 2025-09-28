// src/utils/transactionApi.js
import apiClient from "./apiClient";

export const getTransactions = () => apiClient.get("/transactions");
export const getTransactionById = (id) => apiClient.get(`/transactions/${id}`);
export const createTransaction = (transaction) => apiClient.post("/transactions", transaction);
export const updateTransaction = (id, transaction) => apiClient.put(`/transactions/${id}`, transaction);
export const deleteTransaction = (id) => apiClient.delete(`/transactions/${id}`);
