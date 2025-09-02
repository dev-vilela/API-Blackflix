import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./home.css";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      try {
        const response = await api.get("/movies");
        setFilmes(response.data);
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
        setFilmes([]); // fallback
      } finally {
        setLoading(false);
      }
    }

    loadFilmes();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h1>Carregando filmes...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => (
          <article key={filme.id}>
            <strong>{filme.title}</strong>
            {/* <img
              src={`https://image.tmdb.org/t/p/w500/${filme.image}`}
              alt={filme.title}
            /> */}
            <img src={filme.image} alt={filme.title} />
            
            <Link to={`/filme/${filme.id}`}>Acessar</Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Home;
