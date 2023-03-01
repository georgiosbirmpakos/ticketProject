package aics.domain.movie;

import aics.domain.event.EventRepository;
import aics.domain.event.entities.Event;
import aics.domain.event.models.EventFilters;
import aics.domain.movie.dtos.MovieDto;
import aics.domain.movie.entities.Movie;
import org.apache.commons.lang3.StringUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class MovieService {
    @Inject
    private MovieRepository movieRepository;
    @Inject
    private EventRepository eventRepository;
    @Inject
    private MovieValidator movieValidator;

    public List<Movie> fetchAllMovies() {
        List<Movie> movies = this.movieRepository.findAll().list();

        return movies;
    }

    public Movie fetchMovieById(Long movieId) {
        Movie movie = this.movieRepository.findById(movieId);

        return movie;
    }


    public List<Movie> fetchMoviesPlayingNow() {
        EventFilters eventFilters = new EventFilters()
            .setFromDate(LocalDateTime.now());
        List<Event> eventsPlayingNow = this.eventRepository.findFiltered(eventFilters);
        List<Movie> moviesPlayingNow = eventsPlayingNow.stream().map(Event::getMovie).collect(Collectors.toList());
        return moviesPlayingNow;
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
            .setTrailerSrcUrl(movieDto.getTrailerSrcUrl())
            .setYear(movieDto.getYear());

        this.movieRepository.persist(newMovie);

        return null;
    }

    public String updateMovie(MovieDto movieDto) {
        final String error = this.movieValidator.validateForUpdateMovie(movieDto);
        if (StringUtils.isNotEmpty(error)) {
            return error;
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
            .setDuration(movieDto.getDuration())
            .setTrailerSrcUrl(movieDto.getTrailerSrcUrl())
            .setYear(movieDto.getYear());

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