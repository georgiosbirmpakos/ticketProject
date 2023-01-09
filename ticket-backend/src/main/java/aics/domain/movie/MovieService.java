package aics.domain.movie;

import aics.domain.movie.models.MovieModel;
import org.apache.commons.lang3.StringUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.Base64;
import java.util.List;

@ApplicationScoped
public class MovieService {
    @Inject
    MovieRepository movieRepository;

    public List<Movie> fetchAllMovies() {
        List<Movie> movies = this.movieRepository.findAll().list();

        return movies;
    }

    public String createMovie(MovieModel movieModel) {
        if (movieModel == null) {
            return "movieModel was null";
        }
        if (movieModel.getMovieId() != null) {
            return "movieModel.getMovieId() should be null";
        }
        if (StringUtils.isEmpty(movieModel.getName())) {
            return "movieModel.getName() was empty";
        }
        if (movieModel.getImage() == null || movieModel.getImage().isEmpty()) {
            return "movieModel.getImage() was empty";
        }
        if (StringUtils.isEmpty(movieModel.getDirectors())) {
            return "movieModel.getDirectors() was empty";
        }
        if (StringUtils.isEmpty(movieModel.getScript())) {
            return "movieModel.getScript() was empty";
        }
        if (StringUtils.isEmpty(movieModel.getActors())) {
            return "movieModel.getActors() was empty";
        }
        if (StringUtils.isEmpty(movieModel.getAppropriateness())) {
            return "movieModel.getAppropriateness() was empty";
        }
        if (movieModel.getDuration() <= 0) {
            return "movieModel.getDuration() was not positive";
        }

        Movie newMovie = new Movie()
            .setDescription(movieModel.getDescription())
            .setImage(Base64.getDecoder().decode(movieModel.getImage()))
            .setName(movieModel.getName())
            .setDirectors(movieModel.getDirectors())
            .setScript(movieModel.getScript())
            .setActors(movieModel.getActors())
            .setAppropriateness(movieModel.getAppropriateness())
            .setDuration(movieModel.getDuration());

        this.movieRepository.persist(newMovie);

        return null;
    }

    public String updateMovie(MovieModel movieModel) {
        if (movieModel == null) {
            return "movieModel was null";
        }
        if (movieModel.getMovieId() == null) {
            return "movieModel.getMovieId() was null";
        }
        if (StringUtils.isEmpty(movieModel.getName())) {
            return "movieModel.getName() was empty";
        }
        if (movieModel.getImage() == null || movieModel.getImage().isEmpty()) {
            return "movieModel.getImage() was empty";
        }
        if (StringUtils.isEmpty(movieModel.getDirectors())) {
            return "movieModel.getDirectors() was empty";
        }
        if (StringUtils.isEmpty(movieModel.getScript())) {
            return "movieModel.getScript() was empty";
        }
        if (StringUtils.isEmpty(movieModel.getActors())) {
            return "movieModel.getActors() was empty";
        }
        if (StringUtils.isEmpty(movieModel.getAppropriateness())) {
            return "movieModel.getAppropriateness() was empty";
        }
        if (movieModel.getDuration() <= 0) {
            return "movieModel.getDuration() was not positive";
        }
        Movie movie = this.movieRepository.findById(movieModel.getMovieId());
        if (movie == null) {
            return "couldn't find movie";
        }

        movie.setDescription(movieModel.getDescription())
            .setImage(Base64.getDecoder().decode(movieModel.getImage()))
            .setName(movieModel.getName())
            .setDirectors(movieModel.getDirectors())
            .setScript(movieModel.getScript())
            .setActors(movieModel.getActors())
            .setAppropriateness(movieModel.getAppropriateness())
            .setDuration(movieModel.getDuration());

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