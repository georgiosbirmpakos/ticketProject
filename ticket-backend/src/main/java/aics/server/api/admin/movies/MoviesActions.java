package aics.server.api.admin.movies;

import aics.domain.movie.Movie;
import aics.domain.movie.MovieService;
import aics.domain.movie.models.MovieModel;
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
    public List<MovieModel> doFetchAllMovies() throws TicketException {
        Log.info("Start MoviesActions.doFetchAllMovies");
        List<Movie> movies = this.movieService.fetchAllMovies();
        List<MovieModel> movieModels = CollectionUtils.isNotEmpty(movies)
            ? movies.stream().map(MovieModel::fromMovie).toList()
            : new ArrayList<>();

        Log.info("End MoviesActions.doFetchAllMovies");
        return movieModels;
    }

    @Transactional
    public CreateMovieResponseDto doCreateMovie(CreateMovieRequestDto createMovieRequestDto) throws TicketException {
        Log.info("Start MoviesActions.doCreateMovie");
        CreateMovieResponseDto createMovieResponseDto = new CreateMovieResponseDto();
        byte[] image;
        try {
            image = Files.readAllBytes(createMovieRequestDto.getImage().uploadedFile());
        } catch (IOException e) {
            throw new TicketException(e);
        }

        MovieModel movieModel = new MovieModel()
            .setName(createMovieRequestDto.getName())
            .setDescription(createMovieRequestDto.getDescription())
            .setImage(Base64.getEncoder().encodeToString(image));

        String error = this.movieService.createMovie(movieModel);
        if (error != null) {
            throw new TicketException(new Exception(error), error);
        }

        Log.info("End MoviesActions.doCreateMovie");
        return createMovieResponseDto;
    }

    @Transactional
    public UpdateMovieResponseDto doUpdateMovie(UpdateMovieRequestDto updateMovieRequestDto, Long movieId) throws TicketException {
        Log.info("Start MoviesActions.doCreateMovie");
        UpdateMovieResponseDto updateMovieResponseDto = new UpdateMovieResponseDto();
        MovieModel movieModel = new MovieModel()
            .setMovieId(movieId)
            .setName(updateMovieRequestDto.getName())
            .setDescription(updateMovieRequestDto.getDescription())
            .setImage(Base64.getEncoder().encodeToString(updateMovieRequestDto.getImage()));
        String error = this.movieService.updateMovie(movieModel);
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