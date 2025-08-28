import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MoviesAPI } from "../api/client";
import Header from "../components/Header";
import { isMp4, toEmbedUrl } from "../utils/video";

export default function MovieDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setLoading(true);
      const data = await MoviesAPI.getOne(id);
      setMovie(data);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar filme.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [id]);

  if (loading) return <div className="text-white p-6">Carregando...</div>;
  if (!movie) return <div className="text-white p-6">Filme não encontrado.</div>;

  const embed = toEmbedUrl(movie.movieUrl);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4">{movie.title}</h1>

        {/* Player: YouTube/Vimeo via iframe; MP4 via <video> */}
        <div className="rounded-xl overflow-hidden bg-neutral-900">
          {isMp4(embed) ? (
            <video className="w-full aspect-video" controls poster={movie.image}>
              <source src={embed} type="video/mp4" />
              Seu navegador não suporta vídeo.
            </video>
          ) : (
          <iframe
  className="w-full aspect-video"
  src={toEmbedUrl(movie.movieUrl)}
  title={movie.title}
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowFullScreen
/>

          )}
        </div>

        <section className="mt-6 space-y-2">
          <h2 className="text-xl font-bold">Sinopse</h2>
          <p className="text-white/80">{movie.description || "Sem descrição."}</p>
          <p className="text-white/70">
            <strong>Avaliação:</strong> {movie.rating ?? "—"} / 10
          </p>
        </section>

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold">
            Salvar
          </button>
          <a
            href={movie.movieUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-neutral-700 hover:bg-neutral-600 px-4 py-2 rounded-lg font-semibold"
          >
            Abrir link original
          </a>
          <button
            onClick={() => nav(-1)}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
          >
            Voltar
          </button>
        </div>
      </main>
    </div>
  );
}
