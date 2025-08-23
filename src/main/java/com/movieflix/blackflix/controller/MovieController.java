package com.movieflix.blackflix.controller;

import com.movieflix.blackflix.entities.Movie;
import com.movieflix.blackflix.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController // Controlador REST que expõe os endpoints
@RequestMapping("/movies") // Define  a rota base /movies
public class MovieController {

    @Autowired
    private MovieService service; // Injeta o serviço

    // Lista todos os filmes
    @GetMapping
    public List<Movie> getAllMovies(){
        return  service.findAll();
    }

    //Listar por ID
    @GetMapping("/{id}")
    public  Movie getMovieById(@PathVariable Long id){
        return service.findById(id);
    }

    // Adicionar novo filme
    @PostMapping
    public Movie createMovie(@RequestBody Movie movie) {
        return service.save(movie);
    }

    //Atualizar filmes
    @PutMapping("/{id}")
    public Movie updateMovie(@PathVariable Long id, @RequestBody Movie movie){
        return  service.upddate(id, movie);
    }

    @DeleteMapping("/{id}")
    public void  deleteMovie(@PathVariable Long id){
        service.delete(id);
    }


}
