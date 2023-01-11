package aics.server.api.admin.movies;

import aics.domain.movie.dtos.MovieListItemDto;
import aics.domain.movie.entities.Movie;
import aics.domain.movie.MovieService;
import aics.domain.movie.dtos.MovieDto;
import aics.infrastructure.errors.TicketErrorStatus;
import aics.infrastructure.errors.TicketException;
import aics.server.api.admin.movies.dtos.*;
import io.quarkus.logging.Log;
import org.apache.commons.collections4.CollectionUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@ApplicationScoped
public class MoviesActions {
    @Inject
    MovieService movieService;

    @Transactional()
    public FetchMoviesListResponseDto doFetchAllMovies() throws TicketException {
        Log.info("Start MoviesActions.doFetchAllMovies");
        FetchMoviesListResponseDto fetchMoviesListResponseDto = new FetchMoviesListResponseDto();
        List<Movie> movies = this.movieService.fetchAllMovies();
        List<MovieListItemDto> movieDtos = CollectionUtils.isNotEmpty(movies)
            ? movies.stream().map(MovieListItemDto::fromMovie).toList()
            : new ArrayList<>();

        fetchMoviesListResponseDto.setMovies(movieDtos);
        Log.info("End MoviesActions.doFetchAllMovies");
        return fetchMoviesListResponseDto;
    }

    @Transactional()
    public FetchMovieDetailsResponseDto doFetchMovieDetails(Long movieId) throws TicketException {
        Log.info("Start MoviesActions.doFetchMovieDetails");
        FetchMovieDetailsResponseDto fetchMovieDetailsResponseDto = new FetchMovieDetailsResponseDto();
        Movie movie = this.movieService.fetchMovieById(movieId);
        MovieDto movieDto = MovieDto.fromMovie(movie);

        fetchMovieDetailsResponseDto.setMovie(movieDto);
        Log.info("End MoviesActions.doFetchMovieDetails");
        return fetchMovieDetailsResponseDto;
    }

    @Transactional
    public CreateMovieResponseDto doCreateMovie(CreateMovieRequestDto createMovieRequestDto) throws TicketException {
        Log.info("Start MoviesActions.doCreateMovie");
        if (createMovieRequestDto == null) {
            final String error = "createMovieRequestDto was null";
            throw new TicketException(new Exception(error), error, TicketErrorStatus.UNPROCESSABLE_ENTITY_422);
        }
        CreateMovieResponseDto createMovieResponseDto = new CreateMovieResponseDto();

        String error = this.movieService.createMovie(createMovieRequestDto.getMovie());
        if (error != null) {
            throw new TicketException(new Exception(error), error, TicketErrorStatus.UNPROCESSABLE_ENTITY_422);
        }

        Log.info("End MoviesActions.doCreateMovie");
        return createMovieResponseDto;
    }

    @Transactional
    public UpdateMovieResponseDto doUpdateMovie(UpdateMovieRequestDto updateMovieRequestDto, Long movieId) throws TicketException {
        Log.info("Start MoviesActions.doCreateMovie");
        UpdateMovieResponseDto updateMovieResponseDto = new UpdateMovieResponseDto();
        MovieDto movieDto = new MovieDto()
            .setMovieId(movieId)
            .setName(updateMovieRequestDto.getName())
            .setDescription(updateMovieRequestDto.getDescription())
            .setImage(Base64.getEncoder().encodeToString(updateMovieRequestDto.getImage()))
            .setDirectors(updateMovieRequestDto.getDirectors())
            .setScript(updateMovieRequestDto.getScript())
            .setActors(updateMovieRequestDto.getActors())
            .setAppropriateness(updateMovieRequestDto.getAppropriateness())
            .setDuration(updateMovieRequestDto.getDuration() != null ? Integer.parseInt(updateMovieRequestDto.getDuration()): 0);
        String error = this.movieService.updateMovie(movieDto);
        if (error != null) {
            throw new TicketException(new Exception(error), error);
        }

        Log.info("End MoviesActions.doCreateMovie");
        return updateMovieResponseDto;
    }

    @Transactional()
    public DeleteMovieResponseDto doDeleteMovie(Long movieId) throws TicketException {
        DeleteMovieResponseDto deleteMovieResponseDto = new DeleteMovieResponseDto();
        Log.info("Start MoviesActions.doDeleteMovie");
        String error = this.movieService.deleteMovieById(movieId);
        if (error != null) {
            throw new TicketException(new Exception(error), error);
        }

        Log.info("End MoviesActions.doDeleteMovie");
        return deleteMovieResponseDto;
    }
}