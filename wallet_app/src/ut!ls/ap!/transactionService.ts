import axios from "axios";

const API_BASE_URL = "https://wallet-app-coa-ap.onrender.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getTransactions = (params: any) =>
  api.get("/transactions", { params });
export const addTransaction = (data: any) => api.post("/transactions", data);
export const getCategories = () => api.get("/categories");
export const addCategory = (data: any) => api.post("/categories", data);
// Add other methods as needed
