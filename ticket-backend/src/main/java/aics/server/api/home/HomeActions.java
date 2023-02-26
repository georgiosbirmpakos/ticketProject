package aics.server.api.home;

import aics.domain.movie.MovieService;
import aics.domain.movie.dtos.MovieListItemDto;
import aics.domain.movie.entities.Movie;
import aics.infrastructure.auth.AuthService;
import aics.infrastructure.errors.TicketException;
import aics.server.api.home.dtos.FetchMoviesPlayingNowResponseDto;
import io.quarkus.logging.Log;
import org.apache.commons.collections4.CollectionUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class HomeActions {
    @Inject
    private MovieService movieService;

    @Inject
    private AuthService authService;

    @Transactional(rollbackOn = Exception.class)
    public FetchMoviesPlayingNowResponseDto doFetchMoviesPlayingNow() throws TicketException {
        Log.info("Start HomeActions.doFetchMoviesPlayingNow");
        FetchMoviesPlayingNowResponseDto fetchMoviesPlayingNowResponseDto = new FetchMoviesPlayingNowResponseDto();
        List<Movie> moviesPlayingNow = this.movieService.fetchMoviesPlayingNow();
        List<MovieListItemDto> movieDtos = CollectionUtils.isNotEmpty(moviesPlayingNow)
            ? moviesPlayingNow.stream().map(MovieListItemDto::fromMovie).toList()
            : new ArrayList<>();

        fetchMoviesPlayingNowResponseDto.setMovies(movieDtos);
        Log.info("End HomeActions.doFetchMoviesPlayingNow");
        return fetchMoviesPlayingNowResponseDto;
    }
}