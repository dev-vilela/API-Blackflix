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
        setFilmes([]); 
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

  // Pegar o primeiro filme como destaque
  const destaque = filmes[0];
  const outrosFilmes = filmes.slice(1);

  return (
    <div className="home-container">
      {/* FILME EM DESTAQUE */}
      {destaque && (
        <div
          className="banner"
          style={{ backgroundImage: `url(${destaque.image})` }}
        >
          <div className="banner-content">
            <h1>{destaque.title}</h1>
            <p>{destaque.sinopse?.slice(0, 150)}...</p>
            <div className="banner-buttons">
              <Link to={`/filme/${destaque.id}`} className="btn assistir">
                ▶ Assistir
              </Link>
              <button className="btn info">ℹ Mais informações</button>
            </div>
          </div>
          <div className="banner-fade"></div>
        </div>
      )}

      {/* LISTA DE FILMES EM CARROSSEL */}
      <div className="lista-filmes">
        <h2>Filmes populares</h2>
        <div className="filmes-row">
          {outrosFilmes.map((filme) => (
            <div key={filme.id} className="filme-card">
              <img src={filme.image} alt={filme.title} />
              <div className="overlay">
                <p>{filme.title}</p>
                <Link to={`/filme/${filme.id}`} className="btn-card">Ver</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
}

export default Home;
