package aics.server.api.admin.halls;

import aics.domain.user.RoleEnum;
import aics.infrastructure.errors.TicketException;
import aics.server.api.admin.admin_shared.AdminConstants;
import aics.server.api.admin.halls.dtos.*;
import io.quarkus.logging.Log;
import org.jboss.resteasy.reactive.RestPath;
import org.jboss.resteasy.reactive.RestResponse;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;


@Path(AdminConstants.ADMIN_PATH + "/halls")
@RolesAllowed(RoleEnum.Values.TICKET_ADMIN)
public class HallsController {
    @Inject
    HallsActions hallsActions;

    @Path("/list")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<FetchHallsListResponseDto> handleFetchHallsList() {
        Log.info("Start HallsController.handleFetchHallsList");
        try {
            FetchHallsListResponseDto fetchHallsListResponseDto = this.hallsActions.doFetchHallsList();
            Log.info("End HallsController.handleFetchHallsList");
            return RestResponse.ok(fetchHallsListResponseDto);
        } catch (TicketException e) {
            Log.error("End HallsController.handleFetchHallsList with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End HallsController.handleFetchHallsList with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Path("/details/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<FetchHallDetailsResponseDto> handleFetchHallDetails(@RestPath Long id) {
        Log.info("Start HallsController.handleFetchHallDetails");
        try {
            FetchHallDetailsResponseDto fetchHallDetailsResponseDto = this.hallsActions.doFetchHallDetails(id);
            Log.info("End HallsController.handleFetchHallDetails");
            return RestResponse.ok(fetchHallDetailsResponseDto);
        } catch (TicketException e) {
            Log.error("End HallsController.handleFetchHallDetails with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End HallsController.handleFetchHallDetails with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Path("/options")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<FetchHallsOptionsResponseDto> handleFetchHallsOptions() {
        Log.info("Start HallsController.handleFetchHallsOptions");
        try {
            FetchHallsOptionsResponseDto fetchHallsOptionsResponseDto = this.hallsActions.doFetchHallsOptions();
            Log.info("End HallsController.handleFetchHallsOptions");
            return RestResponse.ok(fetchHallsOptionsResponseDto);
        } catch (TicketException e) {
            Log.error("End HallsController.handleFetchHallsOptions with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End HallsController.handleFetchHallsOptions with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Path("/new")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<CreateHallResponseDto> handleCreateHall(CreateHallRequestDto createHallRequestDto) {
        Log.info("Start HallsController.handleCreateHall");
        try {
            CreateHallResponseDto createHallResponseDto = this.hallsActions.doCreateHall(createHallRequestDto);
            Log.info("End HallsController.handleCreateHall");
            return RestResponse.ok(createHallResponseDto);
        } catch (TicketException e) {
            Log.error("End HallsController.handleCreateHall with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End HallsController.handleCreateHall with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Path("/update")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<UpdateHallResponseDto> handleUpdateHall(UpdateHallRequestDto updateHallRequestDto) {
        Log.info("Start HallsController.handleUpdateHall");
        try {
            UpdateHallResponseDto updateHallResponseDto = this.hallsActions.doUpdateHall(updateHallRequestDto);
            Log.info("End HallsController.handleUpdateHall");
            return RestResponse.ok(updateHallResponseDto);
        } catch (TicketException e) {
            Log.error("End HallsController.handleUpdateHall with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End HallsController.handleUpdateHall with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Path("/id/{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<DeleteHallResponseDto> handleDeleteHall(@RestPath Long id) {
        Log.info("Start HallsController.handleDeleteHall");
        try {
            DeleteHallResponseDto deleteHallResponseDto = this.hallsActions.doDeleteHall(id);
            Log.info("End HallsController.handleDeleteHall");
            return RestResponse.ok(deleteHallResponseDto);
        } catch (TicketException e) {
            Log.error("End HallsController.handleDeleteHall with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End HallsController.handleDeleteHall with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }
}