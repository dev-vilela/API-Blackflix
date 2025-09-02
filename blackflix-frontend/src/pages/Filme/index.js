import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './filme-info.css';
import api from '../../services/api';
import { toast } from 'react-toastify';

function Filme() {
  const { id } = useParams();
  const navigation = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  // Função para converter URL do YouTube em embed
  function getEmbedUrl(url) {
    if (!url) return "";
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  }

  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movies/${id}`)
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Filme não encontrado");
          navigation("/", { replace: true });
          return;
        });
    }

    loadFilme();

    return () => {
      console.log("COMPONENTE FOI DESMONTADO");
    };
  }, [navigation, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id);

    if (hasFilme) {
      toast.warn("ESSE FILME JÁ ESTÁ NA LISTA");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!");
  }

  if (loading) {
    return (
      <div className='filme-info'>
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  return (
    <div className='filme-info'>
      <h1>{filme.title}</h1>

      <div className="video-container">
        <iframe
          width="100%"
          height="450"
          src={getEmbedUrl(filme.youtubeUrl)} 
          title={filme.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <h2>Sinopse</h2>
      <span>{filme.overview}</span>

      <strong>Avaliação: {filme.rating} / 10</strong> 
      <strong>Ano de lançamento: {filme.year} </strong>

      <div className='area-btn'>
        <button onClick={salvarFilme}>Salvar</button>
        <Link to='/' className='btn-voltar'>Voltar</Link>
      </div>
    </div>
  );
}


export default Filme;
