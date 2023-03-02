package aics.server.api.account;

import aics.domain.user.RoleEnum;
import aics.infrastructure.errors.TicketException;
import aics.server.api.account.dtos.FetchUserEventsResponseDto;
import aics.server.api.api_shared.ApiConstants;
import io.quarkus.logging.Log;
import org.jboss.resteasy.reactive.RestPath;
import org.jboss.resteasy.reactive.RestResponse;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path(ApiConstants.API_PATH + "/account")
@PermitAll
public class AccountController {
    @Inject
    private AccountActions accountActions;

    @Path("/user-events")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({RoleEnum.Values.TICKET_USER, RoleEnum.Values.TICKET_ADMIN})
    public RestResponse<FetchUserEventsResponseDto> handleFetchUserEvents(@RestPath Long id) {
        Log.info("Start AccountController.handleFetchUserEvents");
        try {
            FetchUserEventsResponseDto fetchUserEventsResponseDto = this.accountActions.doFetchUserEvents();
            Log.info("End AccountController.handleFetchUserEvents");
            return RestResponse.ok(fetchUserEventsResponseDto);
        } catch (TicketException e) {
            Log.error("End AccountController.handleFetchUserEvents with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End AccountController.handleFetchUserEvents with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }
}