import axios from "axios";

const api = axios.create({ baseURL: `${import.meta.env.VITE_API_URL}/auth` });

export const register = async (formData) => {
  const response = await api.post("/register", formData);
  return response.data;
};

export const login = async (formData) => {
  const response = await api.post("/login", formData);
  return response.data;
};
