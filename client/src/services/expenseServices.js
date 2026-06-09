import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/expenses`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createExpense = async (payload) => {
  const response = await api.post("/", payload);
  return response.data;
};
export const getExpenses = async (filter, startDate, endDate) => {
  const response = await api.get("/", {
    params: { filter, startDate, endDate },
  });
  return response.data;
};
export const updateExpense = async (id, payload) => {
  return await api.patch(`/${id}`, payload);
};
export const deleteExpense = async (id) => {
  return await api.delete(`/${id}`);
};
