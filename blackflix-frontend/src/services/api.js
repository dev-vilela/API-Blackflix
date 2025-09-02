import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export async function fetchMovies() {
  try {
    const response = await api.get("/movies");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    toast.error("Não foi possível carregar os filmes 😥");
    return [];
  }
}

export default api;