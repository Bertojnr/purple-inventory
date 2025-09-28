// src/utils/reportApi.js
import apiClient from "./apiClient";

export const getInventoryReport = () => apiClient.get("/reports/inventory");
export const getSupplierReport = () => apiClient.get("/reports/suppliers");
export const getTransactionReport = () => apiClient.get("/reports/transactions");
export const getLowStockReport = () => apiClient.get("/reports/low-stock");
export const getSalesReport = (from, to) =>
  apiClient.get("/reports/sales", { params: { from, to } });
