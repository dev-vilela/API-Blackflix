package com.movieflix.blackflix.repository;

import com.movieflix.blackflix.entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository  extends JpaRepository<Movie, Long> {
    // JpaRepository já fornece métodos prontos para CRUD
    // (findAll, findById, save, deleteById, etc.)
}
