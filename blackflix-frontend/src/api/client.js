import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
});

export const MoviesAPI = {
  getAll: async () => (await api.get("/movies")).data,
  getOne: async (id) => (await api.get(`/movies/${id}`)).data,
  create: async (payload) => (await api.post("/movies", payload)).data,
  remove: async (id) => await api.delete(`/movies/${id}`),
};

export default api;
