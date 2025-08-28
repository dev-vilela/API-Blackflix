import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const DEFAULTS = [
  { id: crypto.randomUUID(), name: "Paulo Vilela", avatar: "https://i.pravatar.cc/150?img=12" },
  { id: crypto.randomUUID(), name: "Vino",         avatar: "https://i.pravatar.cc/150?img=3"  },
  { id: crypto.randomUUID(), name: "Tereza",       avatar: "https://i.pravatar.cc/150?img=5"  },
  { id: crypto.randomUUID(), name: "Infantil",     avatar: "https://i.pravatar.cc/150?img=20" },
];

const KEY = "blackflix_profiles";

export default function Profiles() {
  const nav = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(KEY) || "null");
    if (saved?.length) setProfiles(saved);
    else {
      setProfiles(DEFAULTS);
      localStorage.setItem(KEY, JSON.stringify(DEFAULTS));
    }
  }, []);

  function save(p) {
    setProfiles(p);
    localStorage.setItem(KEY, JSON.stringify(p));
  }

  function addProfile() {
    if (!name.trim()) return;
    save([...profiles, { id: crypto.randomUUID(), name: name.trim(), avatar: `https://i.pravatar.cc/150?u=${Date.now()}` }]);
    setName("");
  }

  function removeProfile(id) {
    if (!confirm("Excluir este perfil?")) return;
    save(profiles.filter((p) => p.id !== id));
  }

  function choose(p) {
    localStorage.setItem("blackflix_active_profile", p.name);
    nav("/");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-center text-4xl font-extrabold mb-10">Quem está assistindo?</h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center mb-10">
          {profiles.map((p) => (
            <button
              key={p.id}
              onClick={() => choose(p)}
              className="group flex flex-col items-center"
              title={`Entrar como ${p.name}`}
            >
              <img
                src={p.avatar}
                alt={p.name}
                className="w-32 h-32 rounded-lg object-cover ring-2 ring-transparent group-hover:ring-white transition"
              />
              <span className="mt-2 text-white/90">{p.name}</span>
            </button>
          ))}

          {/* Adicionar perfil */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 grid place-content-center rounded-lg bg-neutral-800 border border-neutral-700">
              <span className="text-5xl leading-none">+</span>
            </div>
            <span className="mt-2 text-white/70">Adicionar perfil</span>
          </div>
        </div>

        <div className="max-w-md mx-auto flex gap-2">
          <input
            className="flex-1 rounded-lg p-2 text-black"
            placeholder="Nome do novo perfil"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={addProfile} className="bg-white text-black px-4 rounded-lg font-semibold">
            Adicionar
          </button>
        </div>

        <div className="max-w-md mx-auto mt-6">
          <p className="text-sm text-white/60 mb-2">Gerenciar perfis</p>
          <ul className="divide-y divide-white/10">
            {profiles.map((p) => (
              <li key={p.id} className="py-3 flex items-center justify-between">
                <span>{p.name}</span>
                <button
                  onClick={() => removeProfile(p.id)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
