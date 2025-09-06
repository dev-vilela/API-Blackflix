package com.movieflix.blackflix.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity //Indica que a classe será mapeada para uma tabela no banco
@Table(name = "tb_movie") // Define o nome da tabela
public class Movie {

    @Id // Define a chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Geração automática de ID
    private Long id;

    private String title;
    private String sinopse;
    private String genre;
    private Integer year;
    private Double rating;
    private String image;
    private String youtubeUrl;

    public  Movie(){

    }

    public Movie(Long id, String title,String sinopse, String genre, Integer year, Double rating,String image , String youtubeUrl) {
        this.id = id;
        this.title = title;
        this.sinopse = sinopse;
        this.genre = genre;
        this.year = year;
        this.rating = rating;
        this.image = image;
        this.youtubeUrl = youtubeUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSinopse() {
        return sinopse;
    }

    public void setSinopse(String sinopse) {
        this.sinopse = sinopse;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getYoutubeUrl() {
        return youtubeUrl;
    }

    public void setYoutubeUrl(String youtubeUrl) {
        this.youtubeUrl = youtubeUrl;
    }
}
