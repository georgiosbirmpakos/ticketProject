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
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class HomeActions {
    @Inject
    MovieService movieService;

    @Inject
    AuthService authService;

    @Transactional()
    public FetchMoviesPlayingNowResponseDto doFetchMoviesPlayingNow() throws TicketException {
        Log.info("Start HomeActions.doFetchMoviesPlayingNow");

        Principal principal = this.authService.getPrincipal();
        System.out.println("THANOS_principal: " + principal);
        System.out.println("THANOS_principal_name: " + (principal != null ? principal.getName() : ""));
        System.out.println("THANOS_roles: " + this.authService.getRoles());
        this.authService.getLoggedUserDetails();

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