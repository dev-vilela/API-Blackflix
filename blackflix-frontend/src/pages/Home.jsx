import { useEffect, useState } from "react";
import { MoviesAPI } from "../api/client";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import MovieFormModal from "../components/MovieFormModal";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setLoading(true);
      const data = await MoviesAPI.getAll();
      setMovies(data || []);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar filmes da API.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(movie) {
    if (!confirm(`Excluir "${movie.title}"?`)) return;
    try {
      await MoviesAPI.remove(movie.id);
      setMovies((prev) => prev.filter((m) => m.id !== movie.id));
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir.");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header onAdd={() => setOpen(true)} />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="text-2xl font-bold mb-4">Em destaque</h2>

        {loading ? (
          <p className="text-white/70">Carregando...</p>
        ) : movies.length === 0 ? (
          <p className="text-white/70">
            Nenhum filme cadastrado. Clique em <strong>+ Adicionar Filme</strong>.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((mv) => (
              <MovieCard key={mv.id} movie={mv} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>

      <MovieFormModal
        open={open}
        onClose={() => setOpen(false)}
        onSaved={load}
      />
    </div>
  );
}
