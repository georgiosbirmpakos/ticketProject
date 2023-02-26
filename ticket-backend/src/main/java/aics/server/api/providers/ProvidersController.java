package aics.server.api.providers;

import aics.infrastructure.errors.TicketException;
import aics.server.api.api_shared.ApiConstants;
import aics.server.api.providers.dtos.FetchProvidersListResponseDto;
import io.quarkus.logging.Log;
import org.jboss.resteasy.reactive.RestResponse;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path(ApiConstants.API_PATH + "/providers")
public class ProvidersController {
    @Inject
    private ProvidersActions providersActions;

    @Path("/providers-list")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<FetchProvidersListResponseDto> handleFetchProvidersList() {
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

}