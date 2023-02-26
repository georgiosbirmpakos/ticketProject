package aics.server.api.admin.events;

import aics.domain.event.EventService;
import aics.domain.event.dtos.EventDto;
import aics.domain.event.dtos.EventOptionsDto;
import aics.domain.event.entities.Event;
import aics.domain.provider.ProviderService;
import aics.infrastructure.errors.TicketErrorStatus;
import aics.infrastructure.errors.TicketException;
import aics.server.api.admin.events.dtos.*;
import io.quarkus.logging.Log;
import org.apache.commons.collections4.CollectionUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class EventsActions {
    @Inject
    private EventService eventService;
    @Inject
    private ProviderService providerService;

    @Transactional(rollbackOn = Exception.class)
    public FetchEventsListResponseDto doFetchEventsList() throws TicketException {
        FetchEventsListResponseDto fetchEventsListResponseDto = new FetchEventsListResponseDto();
        Log.info("Start EventsActions.doFetchEventsList");
        List<Event> events = this.eventService.fetchAllEvents();
        List<EventDto> eventDtos = CollectionUtils.isNotEmpty(events) ? events.stream().map(EventDto::fromEvent).toList() : new ArrayList<>();
        fetchEventsListResponseDto.setEvents(eventDtos);
        Log.info("End EventsActions.doFetchEventsList");
        return fetchEventsListResponseDto;
    }

    @Transactional(rollbackOn = Exception.class)
    public FetchEventDetailsResponseDto doFetchEventDetails(Long eventId) throws TicketException {
        FetchEventDetailsResponseDto fetchEventDetailsResponseDto = new FetchEventDetailsResponseDto();
        Log.info("Start EventsActions.doFetchEventDetails");
        Event event = this.eventService.fetchEventById(eventId);
        EventDto eventDto = EventDto.fromEvent(event);
        fetchEventDetailsResponseDto.setEvent(eventDto);
        Log.info("End EventsActions.doFetchEventDetails");
        return fetchEventDetailsResponseDto;
    }

    @Transactional(rollbackOn = Exception.class)
    public FetchEventOptionsResponseDto doFetchEventOptions() throws TicketException {
        FetchEventOptionsResponseDto fetchEventOptionsResponseDto = new FetchEventOptionsResponseDto();
        Log.info("Start EventsActions.doFetchEventOptions");
        EventOptionsDto eventOptionsDto = this.eventService.fetchEventOptions();
        fetchEventOptionsResponseDto.setOptions(eventOptionsDto);
        Log.info("End EventsActions.doFetchEventOptions");
        return fetchEventOptionsResponseDto;
    }


    @Transactional
    public CreateEventResponseDto doCreateEvent(CreateEventRequestDto createEventRequestDto) throws TicketException {
        Log.info("Start EventsActions.doCreateEvent");
        CreateEventResponseDto createEventResponseDto = new CreateEventResponseDto();
        if (createEventRequestDto == null) {
            final String errorMsg = "createEventRequestDto was null";
            throw new TicketException(new Exception(errorMsg), errorMsg, TicketErrorStatus.UNPROCESSABLE_ENTITY_422);
        }

        String error = this.eventService.createEvent(createEventRequestDto.getEvent());
        if (error != null) {
            throw new TicketException(new Exception(error), error, TicketErrorStatus.UNPROCESSABLE_ENTITY_422);
        }

        Log.info("End EventsActions.doCreateEvent");
        return createEventResponseDto;
    }

    @Transactional
    public UpdateEventResponseDto doUpdateEvent(UpdateEventRequestDto updateEventRequestDto) throws TicketException {
        Log.info("Start EventsActions.doUpdateEvent");
        UpdateEventResponseDto updateEventResponseDto = new UpdateEventResponseDto();
        if (updateEventRequestDto == null) {
            final String errorMsg = "updateEventRequestDto was null";
            throw new TicketException(new Exception(errorMsg), errorMsg, TicketErrorStatus.UNPROCESSABLE_ENTITY_422);
        }

        String error = this.eventService.updateEvent(updateEventRequestDto.getEvent());
        if (error != null) {
            throw new TicketException(new Exception(error), error, TicketErrorStatus.UNPROCESSABLE_ENTITY_422);
        }

        Log.info("End EventsActions.doUpdateEvent");
        return updateEventResponseDto;
    }

    @Transactional(rollbackOn = Exception.class)
    public DeleteEventResponseDto doDeleteEvent(Long eventId) throws TicketException {
        DeleteEventResponseDto deleteEventResponseDto = new DeleteEventResponseDto();
        Log.info("Start EventsActions.doDeleteEvent");
        String error = this.eventService.deleteEventById(eventId);
        if (error != null) {
            throw new TicketException(new Exception(error), error);
        }

        Log.info("End EventsActions.doDeleteEvent");
        return deleteEventResponseDto;
    }

}
