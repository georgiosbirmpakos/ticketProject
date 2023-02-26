package aics.server.api.admin.providers;

import aics.domain.user.RoleEnum;
import aics.infrastructure.errors.TicketException;
import aics.server.api.admin.admin_shared.AdminConstants;
import aics.server.api.admin.providers.dtos.*;
import io.quarkus.logging.Log;
import org.jboss.resteasy.reactive.RestPath;
import org.jboss.resteasy.reactive.RestResponse;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path(AdminConstants.ADMIN_PATH + "/providers")
@RolesAllowed(RoleEnum.Values.TICKET_ADMIN)
public class ProvidersController {
    @Inject
    private ProvidersActions providersActions;

    @Path("/list")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<FetchProvidersListResponseDto> handleFetchProviderDetails() {
        Log.info("Start ProvidersController.handleFetchProvidersList");
        try {
            FetchProvidersListResponseDto fetchProvidersListResponseDto = this.providersActions.doFetchProvidersList();
            Log.info("End ProvidersController.handleFetchProvidersList");
            return RestResponse.ok(fetchProvidersListResponseDto);
        } catch (TicketException e) {
            Log.error("End ProvidersController.handleFetchProvidersList with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End ProvidersController.handleFetchProvidersList with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Path("/details/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<FetchProviderDetailsResponseDto> handleFetchProviderDetails(@RestPath Long id) {
        Log.info("Start ProvidersController.handleFetchProviderDetails");
        try {
            FetchProviderDetailsResponseDto fetchProviderDetailsResponseDto = this.providersActions.doFetchProvidersDetails(id);
            Log.info("End ProvidersController.handleFetchProviderDetails");
            return RestResponse.ok(fetchProviderDetailsResponseDto);
        } catch (TicketException e) {
            Log.error("End ProvidersController.handleFetchProviderDetails with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End ProvidersController.handleFetchProviderDetails with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Path("/new")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<CreateProviderResponseDto> handleCreateProvider(CreateProviderRequestDto createProviderRequestDto) {
        Log.info("Start ProvidersController.handleCreateProvider");
        try {
            CreateProviderResponseDto createProviderResponseDto = this.providersActions.doCreateProvider(createProviderRequestDto);
            Log.info("End ProvidersController.handleCreateProvider");
            return RestResponse.ok(createProviderResponseDto);
        } catch (TicketException e) {
            Log.error("End ProvidersController.handleCreateProvider with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End ProvidersController.handleCreateProvider with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Path("/update")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<UpdateProviderResponseDto> handleUpdateProvider(UpdateProviderRequestDto updateProviderRequestDto) {
        Log.info("Start ProvidersController.handleUpdateProvider");
        try {
            UpdateProviderResponseDto updateProviderResponseDto = this.providersActions.doUpdateProvider(updateProviderRequestDto);
            Log.info("End ProvidersController.handleUpdateProvider");
            return RestResponse.ok(updateProviderResponseDto);
        } catch (TicketException e) {
            Log.error("End ProvidersController.handleUpdateProvider with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End ProvidersController.handleUpdateProvider with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Path("/id/{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<DeleteProviderResponseDto> handleDeleteProvider(@RestPath Long id) {
        Log.info("Start ProvidersController.handleDeleteProvider");
        try {
            DeleteProviderResponseDto deleteProviderResponseDto = this.providersActions.doDeleteProvider(id);
            Log.info("End ProvidersController.handleDeleteProvider");
            return RestResponse.ok(deleteProviderResponseDto);
        } catch (TicketException e) {
            Log.error("End ProvidersController.handleDeleteProvider with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End ProvidersController.handleDeleteProvider with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }
}