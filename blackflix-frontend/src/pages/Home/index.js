import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./home.css";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const rowRef = useRef(null);

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

  // Scroll automático
  useEffect(() => {
    const interval = setInterval(() => {
      if (rowRef.current) {
        rowRef.current.scrollBy({ left: 220, behavior: "smooth" });
        if (
          rowRef.current.scrollLeft + rowRef.current.clientWidth >=
          rowRef.current.scrollWidth
        ) {
          rowRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 4000); // muda a cada 4s
    return () => clearInterval(interval);
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

  const scrollLeft = () => {
    rowRef.current.scrollBy({ left: -220, behavior: "smooth" });
  };

  const scrollRight = () => {
    rowRef.current.scrollBy({ left: 220, behavior: "smooth" });
  };

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
        <div className="carousel-container">
          <button className="arrow left" onClick={scrollLeft}>◀</button>
          <div className="filmes-row" ref={rowRef}>
            {outrosFilmes.map((filme) => (
              <div key={filme.id} className="filme-card">
                <img src={filme.image} alt={filme.title} />
                <div className="overlay">
                  <p>{filme.title}</p>
                  <Link to={`/filme/${filme.id}`} className="btn-card">
                    Ver
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <button className="arrow right" onClick={scrollRight}>▶</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
