import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="group relative rounded-xl overflow-hidden bg-neutral-900">
        <img
        src={movie.image || "https://placehold.co/600x900?text=BlackFlix"}
        alt={movie.title}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col gap-2">
        <h3 className="text-white font-bold text-sm line-clamp-2 drop-shadow">
          {movie.title}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="flex-1 bg-white text-black text-xs font-semibold px-2 py-1 rounded-md"
          >
            Acessar
          </button>
          <button
            onClick={() => onDelete?.(movie)}
            className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
