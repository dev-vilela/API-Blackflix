import { useState } from "react";
import { MoviesAPI } from "../api/client";

export default function MovieFormModal({ open, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    movieUrl: "",
    rating: 0,
  });
  const [loading, setLoading] = useState(false);
  if (!open) return null;

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      // Ajuste os nomes dos campos aqui se sua API usar outros nomes
      await MoviesAPI.create(form);
      onSaved?.();
      onClose?.();
    } catch (err) {
      alert("Erro ao salvar filme. Veja o console.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6">
        <h2 className="text-xl font-extrabold mb-4">Cadastrar Filme</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full border rounded-lg p-2"
            placeholder="Título"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            required
          />
          <input
            className="w-full border rounded-lg p-2"
            placeholder="URL da Imagem (poster)"
            value={form.imageUrl}
            onChange={(e) => update("imageUrl", e.target.value)}
          />
          <input
            className="w-full border rounded-lg p-2"
            placeholder="URL do Filme (YouTube/MP4/Vimeo)"
            value={form.movieUrl}
            onChange={(e) => update("movieUrl", e.target.value)}
            required
          />
          <textarea
            className="w-full border rounded-lg p-2"
            placeholder="Descrição / Sinopse"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={4}
          />
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            className="w-full border rounded-lg p-2"
            placeholder="Avaliação (0–10)"
            value={form.rating}
            onChange={(e) => update("rating", e.target.value)}
          />

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-neutral-200 hover:bg-neutral-300 text-black font-semibold px-4 py-2 rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
