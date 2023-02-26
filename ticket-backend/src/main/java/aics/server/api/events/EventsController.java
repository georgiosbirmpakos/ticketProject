package aics.server.api.events;


import aics.domain.user.RoleEnum;
import aics.infrastructure.errors.TicketException;
import aics.server.api.admin.events.dtos.FetchEventDetailsResponseDto;
import aics.server.api.api_shared.ApiConstants;
import aics.server.api.events.dtos.*;
import io.quarkus.logging.Log;
import org.jboss.resteasy.reactive.RestPath;
import org.jboss.resteasy.reactive.RestResponse;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


@Path(ApiConstants.API_PATH + "/events")
@PermitAll
public class EventsController {
    @Inject
    private EventsActions eventsActions;

    @Path("/list-filtered")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<FetchEventsFilteredResponseDto> handleFetchEventsFiltered(FetchEventsFilteredRequestDto fetchEventsFilteredRequestDto) {
        Log.info("Start EventsController.handleFetchEventsFiltered");
        try {
            FetchEventsFilteredResponseDto fetchEventsFilteredResponseDto = this.eventsActions.doFetchEventsFiltered(fetchEventsFilteredRequestDto);
            Log.info("End EventsController.handleFetchEventsFiltered");
            return RestResponse.ok(fetchEventsFilteredResponseDto);
        } catch (TicketException e) {
            Log.error("End EventsController.handleFetchEventsFiltered with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End EventsController.handleFetchEventsFiltered with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Path("/filter-options")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<FetchEventsFilterOptionsDto> handleFetchEventsFilterOptions() {
        Log.info("Start EventsController.handleFetchEventsFilterOptions");
        try {
            FetchEventsFilterOptionsDto fetchEventsFilterOptionsDto = this.eventsActions.doFetchEventsFilterOptions();
            Log.info("End EventsController.handleFetchEventsFilterOptions");
            return RestResponse.ok(fetchEventsFilterOptionsDto);
        } catch (TicketException e) {
            Log.error("End EventsController.handleFetchEventsFilterOptions with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End EventsController.handleFetchEventsFilterOptions with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Path("/details/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<FetchEventDetailsResponseDto> handleFetchEventDetails(@RestPath Long id) {
        Log.info("Start EventsController.handleFetchEventDetails");
        try {
            FetchEventDetailsResponseDto fetchEventDetailsResponseDto = this.eventsActions.doFetchEventDetails(id);
            Log.info("End EventsController.handleFetchEventDetails");
            return RestResponse.ok(fetchEventDetailsResponseDto);
        } catch (TicketException e) {
            Log.error("End EventsController.handleFetchEventDetails with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End EventsController.handleFetchEventDetails with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Path("/book-ticket")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({RoleEnum.Values.TICKET_USER, RoleEnum.Values.TICKET_ADMIN})
    public RestResponse<BookTicketResponseDto> handleBookTicket(BookTicketRequestDto bookTicketRequestDto) {
        Log.info("Start EventsController.handleBookTicket");
        try {
            BookTicketResponseDto bookTicketResponseDto = this.eventsActions.doBookTicket(bookTicketRequestDto);
            Log.info("End EventsController.handleBookTicket");
            return RestResponse.ok(bookTicketResponseDto);
        } catch (TicketException e) {
            Log.error("End EventsController.handleBookTicket with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End EventsController.handleBookTicket with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }
}