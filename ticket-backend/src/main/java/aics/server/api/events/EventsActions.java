package aics.server.api.events;

import aics.domain.event.EventService;
import aics.domain.event.dtos.EventDto;
import aics.domain.event.dtos.EventsFilterOptionsDto;
import aics.domain.event.entities.Event;
import aics.domain.event.models.EventFilters;
import aics.infrastructure.errors.TicketErrorStatus;
import aics.infrastructure.errors.TicketException;
import aics.server.api.admin.events.dtos.FetchEventDetailsResponseDto;
import aics.server.api.events.dtos.FetchEventsFilterOptionsDto;
import aics.server.api.events.dtos.FetchEventsFilteredRequestDto;
import aics.server.api.events.dtos.FetchEventsFilteredResponseDto;
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
    EventService eventService;

    @Transactional()
    public FetchEventsFilteredResponseDto doFetchEventsFiltered(FetchEventsFilteredRequestDto fetchEventsFilteredRequestDto) throws TicketException {
        FetchEventsFilteredResponseDto fetchEventsFilteredResponseDto = new FetchEventsFilteredResponseDto();
        Log.info("Start EventsActions.doFetchEventsFiltered");
        if (fetchEventsFilteredRequestDto == null) {
            final String error = "fetchEventsFilteredRequestDto was null";
            throw new TicketException(new Exception(error), error, TicketErrorStatus.UNPROCESSABLE_ENTITY_422);
        }
        EventFilters eventFilters = new EventFilters()
            .setMovieId(fetchEventsFilteredRequestDto.getMovieId())
            .setProviderId(fetchEventsFilteredRequestDto.getProviderId())
            .setFromDate(fetchEventsFilteredRequestDto.getFromDate() != null ? fetchEventsFilteredRequestDto.getFromDate().toLocalDateTime() : null)
            .setToDate(fetchEventsFilteredRequestDto.getToDate() != null ? fetchEventsFilteredRequestDto.getToDate().toLocalDateTime() : null);
        List<Event> events = this.eventService.fetchFilteredEvents(eventFilters);
        List<EventDto> eventDtos = CollectionUtils.isNotEmpty(events) ? events.stream().map(EventDto::fromEvent).toList() : new ArrayList<>();
        fetchEventsFilteredResponseDto.setEvents(eventDtos);
        Log.info("End EventsActions.doFetchEventsFiltered");
        return fetchEventsFilteredResponseDto;
    }

    @Transactional()
    public FetchEventsFilterOptionsDto doFetchEventsFilterOptions() throws TicketException {
        FetchEventsFilterOptionsDto fetchEventsFilterOptionsDto = new FetchEventsFilterOptionsDto();
        Log.info("Start EventsActions.doFetchEventsFilterOptions");
        EventFilters eventFilters = new EventFilters();
        EventsFilterOptionsDto eventsFilterOptionsDto = this.eventService.fetchEventsFilterOptions();
        fetchEventsFilterOptionsDto.setOptions(eventsFilterOptionsDto);
        Log.info("End EventsActions.doFetchEventsFilterOptions");
        return fetchEventsFilterOptionsDto;
    }

    @Transactional()
    public FetchEventDetailsResponseDto doFetchEventDetails(Long eventId) throws TicketException {
        FetchEventDetailsResponseDto fetchEventDetailsResponseDto = new FetchEventDetailsResponseDto();
        Log.info("Start EventsActions.doFetchEventDetails");
        Event event = this.eventService.fetchEventById(eventId);
        EventDto eventDto = EventDto.fromEvent(event);
        fetchEventDetailsResponseDto.setEvent(eventDto);
        Log.info("End EventsActions.doFetchEventDetails");
        return fetchEventDetailsResponseDto;
    }

}
