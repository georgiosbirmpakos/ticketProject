package aics.server.api.admin.movies;

import aics.domain.movie.MovieService;
import aics.domain.movie.dtos.MovieDto;
import aics.domain.movie.dtos.MovieListItemDto;
import aics.domain.movie.entities.Movie;
import aics.infrastructure.errors.TicketErrorStatus;
import aics.infrastructure.errors.TicketException;
import aics.server.api.admin.movies.dtos.*;
import io.quarkus.logging.Log;
import org.apache.commons.collections4.CollectionUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class MoviesActions {
    @Inject
    private MovieService movieService;

    @Transactional(rollbackOn = Exception.class)
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

    @Transactional(rollbackOn = Exception.class)
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
    public UpdateMovieResponseDto doUpdateMovie(UpdateMovieRequestDto updateMovieRequestDto) throws TicketException {
        Log.info("Start MoviesActions.doCreateMovie");
        if (updateMovieRequestDto == null) {
            final String error = "updateMovieRequestDto was null";
            throw new TicketException(new Exception(error), error, TicketErrorStatus.UNPROCESSABLE_ENTITY_422);

        }
        UpdateMovieResponseDto updateMovieResponseDto = new UpdateMovieResponseDto();

        String error = this.movieService.updateMovie(updateMovieRequestDto.getMovie());
        if (error != null) {
            throw new TicketException(new Exception(error), error);
        }

        Log.info("End MoviesActions.doCreateMovie");
        return updateMovieResponseDto;
    }

    @Transactional(rollbackOn = Exception.class)
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