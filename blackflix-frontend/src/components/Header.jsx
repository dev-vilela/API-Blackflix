import { Link } from "react-router-dom";

export default function Header({ onAdd }) {
  const active = localStorage.getItem("blackflix_active_profile");

  return (
    <header className="w-full bg-black border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link to="/" className="select-none">
          <h1 className="text-2xl font-extrabold tracking-wide">
            <span className="text-red-600">CINE</span> BLACK
          </h1>
        </Link>

        <div className="flex items-center gap-3">
          {active && (
            <span className="hidden sm:inline text-white/70 text-sm">
              Perfil: <strong className="text-white">{active}</strong>
            </span>
          )}
          <Link
            to="/profiles"
            className="bg-white text-black px-3 py-1.5 rounded-lg text-sm font-semibold"
          >
            Perfis
          </Link>

          {onAdd && (
            <button
              onClick={onAdd}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-semibold"
            >
              + Adicionar Filme
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
