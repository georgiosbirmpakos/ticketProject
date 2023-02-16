package aics.server.api.admin.events;

import aics.domain.user.RoleEnum;
import aics.infrastructure.errors.TicketException;
import aics.server.api.admin.admin_shared.AdminConstants;
import aics.server.api.admin.events.dtos.*;
import io.quarkus.logging.Log;
import org.jboss.resteasy.reactive.RestPath;
import org.jboss.resteasy.reactive.RestResponse;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;


@Path(AdminConstants.ADMIN_PATH + "/events")
@RolesAllowed(RoleEnum.Values.TICKET_ADMIN)
public class EventsController {
    @Inject
    EventsActions eventsActions;

    @Path("/list")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<FetchEventsListResponseDto> handleFetchEventsList() {
        Log.info("Start EventsController.handleFetchEventsList");
        try {
            FetchEventsListResponseDto fetchEventsListResponseDto = this.eventsActions.doFetchEventsList();
            Log.info("End EventsController.handleFetchEventsList");
            return RestResponse.ok(fetchEventsListResponseDto);
        } catch (TicketException e) {
            Log.error("End EventsController.handleFetchEventsList with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End EventsController.handleFetchEventsList with error", e);
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

    @Path("/options")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<FetchEventOptionsResponseDto> handleFetchEventOptions() {
        Log.info("Start EventsController.handleFetchEventOptions");
        try {
            FetchEventOptionsResponseDto fetchEventOptionsResponseDto = this.eventsActions.doFetchEventOptions();
            Log.info("End EventsController.handleFetchEventOptions");
            return RestResponse.ok(fetchEventOptionsResponseDto);
        } catch (TicketException e) {
            Log.error("End EventsController.handleFetchEventOptions with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End EventsController.handleFetchEventOptions with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Path("/new")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<CreateEventResponseDto> handleCreateEvent(CreateEventRequestDto createEventRequestDto) {
        Log.info("Start EventsController.handleCreateEvent");
        try {
            CreateEventResponseDto createEventResponseDto = this.eventsActions.doCreateEvent(createEventRequestDto);
            Log.info("End EventsController.handleCreateEvent");
            return RestResponse.ok(createEventResponseDto);
        } catch (TicketException e) {
            Log.error("End EventsController.handleCreateEvent with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End EventsController.handleCreateEvent with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Path("/update")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<UpdateEventResponseDto> handleUpdateEvent(UpdateEventRequestDto updateEventRequestDto) {
        Log.info("Start EventsController.handleUpdateEvent");
        try {
            UpdateEventResponseDto updateHallResponseDto = this.eventsActions.doUpdateEvent(updateEventRequestDto);
            Log.info("End EventsController.handleUpdateEvent");
            return RestResponse.ok(updateHallResponseDto);
        } catch (TicketException e) {
            Log.error("End EventsController.handleUpdateEvent with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End EventsController.handleUpdateEvent with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Path("/id/{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<DeleteEventResponseDto> handleDeleteEvent(@RestPath Long id) {
        Log.info("Start EventsController.handleDeleteEvent");
        try {
            DeleteEventResponseDto deleteHallResponseDto = this.eventsActions.doDeleteEvent(id);
            Log.info("End EventsController.handleDeleteEvent");
            return RestResponse.ok(deleteHallResponseDto);
        } catch (TicketException e) {
            Log.error("End EventsController.handleDeleteEvent with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End EventsController.handleDeleteEvent with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }
}