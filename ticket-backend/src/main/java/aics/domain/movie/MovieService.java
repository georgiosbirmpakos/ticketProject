package aics.domain.movie;

import aics.domain.movie.entities.Movie;
import aics.domain.movie.dtos.MovieDto;
import org.apache.commons.lang3.StringUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.Base64;
import java.util.List;

@ApplicationScoped
public class MovieService {
    @Inject
    MovieRepository movieRepository;
    @Inject
    MovieValidator movieValidator;

    public List<Movie> fetchAllMovies() {
        List<Movie> movies = this.movieRepository.findAll().list();

        return movies;
    }
    public Movie fetchMovieById(Long movieId) {
        Movie movie = this.movieRepository.findById(movieId);

        return movie;
    }

    public String createMovie(MovieDto movieDto) {
        final String error = this.movieValidator.validateForCreateMovie(movieDto);
        if (StringUtils.isNotEmpty(error)) {
            return error;
        }

        Movie newMovie = new Movie()
            .setDescription(movieDto.getDescription())
            .setImage(Base64.getDecoder().decode(movieDto.getImage()))
            .setImageName(movieDto.getImageName())
            .setImageMimePrefix(movieDto.getImageMimePrefix())
            .setName(movieDto.getName())
            .setDirectors(movieDto.getDirectors())
            .setScript(movieDto.getScript())
            .setActors(movieDto.getActors())
            .setAppropriateness(movieDto.getAppropriateness())
            .setDuration(movieDto.getDuration())
            .setTrailerSrcUrl(movieDto.getTrailerSrcUrl());

        this.movieRepository.persist(newMovie);

        return null;
    }

    public String updateMovie(MovieDto movieDto) {
        if (movieDto == null) {
            return "movieDto was null";
        }
        if (movieDto.getMovieId() == null) {
            return "movieDto.getMovieId() was null";
        }
        if (StringUtils.isEmpty(movieDto.getName())) {
            return "movieDto.getName() was empty";
        }
        if (movieDto.getImage() == null || movieDto.getImage().isEmpty()) {
            return "movieDto.getImage() was empty";
        }
        if (StringUtils.isEmpty(movieDto.getDirectors())) {
            return "movieDto.getDirectors() was empty";
        }
        if (StringUtils.isEmpty(movieDto.getScript())) {
            return "movieDto.getScript() was empty";
        }
        if (StringUtils.isEmpty(movieDto.getActors())) {
            return "movieDto.getActors() was empty";
        }
        if (StringUtils.isEmpty(movieDto.getAppropriateness())) {
            return "movieDto.getAppropriateness() was empty";
        }
        if (movieDto.getDuration() <= 0) {
            return "movieDto.getDuration() was not positive";
        }
        Movie movie = this.movieRepository.findById(movieDto.getMovieId());
        if (movie == null) {
            return "couldn't find movie";
        }

        movie.setDescription(movieDto.getDescription())
            .setImage(Base64.getDecoder().decode(movieDto.getImage()))
            .setImageName(movieDto.getImageName())
            .setImageMimePrefix(movieDto.getImageMimePrefix())
            .setName(movieDto.getName())
            .setDirectors(movieDto.getDirectors())
            .setScript(movieDto.getScript())
            .setActors(movieDto.getActors())
            .setAppropriateness(movieDto.getAppropriateness())
            .setDuration(movieDto.getDuration());

        this.movieRepository.persist(movie);

        return null;
    }

    public String deleteMovieById(Long movieId) {
        if (movieId == null) {
            return "movieId was null";
        }
        Movie movie = this.movieRepository.findById(movieId);
        if (movie == null) {
            return "couldn't find movie";
        }
        this.movieRepository.delete(movie);

        return null;
    }
}