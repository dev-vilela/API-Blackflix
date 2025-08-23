package com.movieflix.blackflix.services;

import com.movieflix.blackflix.entities.Movie;
import com.movieflix.blackflix.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // Indica que é um serviço (camada de regras de negócio)
public class MovieService {

    @Autowired // Injeta automaticamente o repositório
    private MovieRepository repository;

    public List<Movie> findAll(){
        return repository.findAll();// Retorna todos os filmes
    }

    public Movie findById(Long id){
        // Busca filme por ID ou lança exceção se não encontrar
        return  repository.findById(id).orElseThrow(() -> new RuntimeException("Movie not found"));
    }

    public Movie save(Movie movie) {
        return repository.save(movie); // Salva novo filme
    }

    public Movie upddate(Long id, Movie newMovie){
        // Busca filme existente, atualiza os campos e salva de novo
        Movie movie = repository.findById(id).orElseThrow(() -> new RuntimeException("Movie not found"));

        movie.setTitle(newMovie.getTitle());
        movie.setGenre(newMovie.getGenre());
        movie.setYear(newMovie.getYear());
        movie.setRating(newMovie.getRating());
        movie.setYoutubeUrl(newMovie.getYoutubeUrl());
        return repository.save(movie);
    }

    public void delete(Long id){
        repository.deleteById(id); // Deleta o filme pelo ID
    }

}
