package aics.server.api.admin.movies;

import aics.domain.user.RoleEnum;
import aics.infrastructure.errors.TicketException;
import aics.server.api.admin.admin_shared.AdminConstants;
import aics.server.api.admin.movies.dtos.*;
import io.quarkus.logging.Log;
import org.jboss.resteasy.reactive.RestPath;
import org.jboss.resteasy.reactive.RestResponse;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path(AdminConstants.ADMIN_PATH + "/movies")
@RolesAllowed(RoleEnum.Values.TICKET_ADMIN)
public class MoviesController {
    @Inject
    private MoviesActions moviesActions;

    @Path("/list")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<FetchMoviesListResponseDto> handleFetchMovieDetails() {
        Log.info("Start MoviesController.handleFetchMoviesList");
        try {
            FetchMoviesListResponseDto fetchMoviesListResponseDto = this.moviesActions.doFetchAllMovies();
            Log.info("End MoviesController.handleFetchMoviesList");
            return RestResponse.ok(fetchMoviesListResponseDto);
        } catch (TicketException e) {
            Log.error("End MoviesController.handleFetchMoviesList with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End MoviesController.handleFetchMoviesList with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Path("/details/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<FetchMovieDetailsResponseDto> handleFetchMovieDetails(@RestPath Long id) {
        Log.info("Start MoviesController.handleFetchMovieDetails");
        try {
            FetchMovieDetailsResponseDto fetchMovieDetailsResponseDto = this.moviesActions.doFetchMovieDetails(id);
            Log.info("End MoviesController.handleFetchMovieDetails");
            return RestResponse.ok(fetchMovieDetailsResponseDto);
        } catch (TicketException e) {
            Log.error("End MoviesController.handleFetchMovieDetails with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End MoviesController.handleFetchMovieDetails with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Path("/new")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<CreateMovieResponseDto> handleCreateMovie(CreateMovieRequestDto createMovieRequestDto) {
        Log.info("Start MoviesController.handleCreateMovie");
        try {
            CreateMovieResponseDto createMovieResponseDto = this.moviesActions.doCreateMovie(createMovieRequestDto);
            Log.info("End MoviesController.handleCreateMovie");
            return RestResponse.ok(createMovieResponseDto);
        } catch (TicketException e) {
            Log.error("End MoviesController.handleCreateMovie with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End MoviesController.handleCreateMovie with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Path("/update")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<UpdateMovieResponseDto> handleUpdateMovie(UpdateMovieRequestDto updateMovieRequestDto) {
        Log.info("Start MoviesController.handleUpdateMovie");
        try {
            UpdateMovieResponseDto updateMovieResponseDto = this.moviesActions.doUpdateMovie(updateMovieRequestDto);
            Log.info("End MoviesController.handleUpdateMovie");
            return RestResponse.ok(updateMovieResponseDto);
        } catch (TicketException e) {
            Log.error("End MoviesController.handleUpdateMovie with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End MoviesController.handleUpdateMovie with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Path("/id/{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<DeleteMovieResponseDto> handleDeleteMovie(@RestPath Long id) {
        Log.info("Start MoviesController.handleDeleteMovie");
        try {
            DeleteMovieResponseDto deleteMovieResponseDto = this.moviesActions.doDeleteMovie(id);
            Log.info("End MoviesController.handleDeleteMovie");
            return RestResponse.ok(deleteMovieResponseDto);
        } catch (TicketException e) {
            Log.error("End MoviesController.handleDeleteMovie with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End MoviesController.handleDeleteMovie with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }
}