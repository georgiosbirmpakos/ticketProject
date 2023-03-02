package aics.server.api.account;

import aics.domain.event.EventService;
import aics.domain.event.dtos.EventDto;
import aics.domain.event.entities.Event;
import aics.domain.ticket.entities.Ticket;
import aics.infrastructure.auth.AuthService;
import aics.infrastructure.auth.LoggedUserDetails;
import aics.infrastructure.errors.TicketException;
import aics.server.api.account.dtos.FetchUserEventsResponseDto;
import io.quarkus.logging.Log;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@ApplicationScoped
public class AccountActions {
    @Inject
    private AuthService authService;
    @Inject
    private EventService eventService;

    @Transactional(rollbackOn = Exception.class)
    public FetchUserEventsResponseDto doFetchUserEvents() throws TicketException {
        Log.info("Start AccountActions.doFetchUserEvents");
        FetchUserEventsResponseDto fetchUserEventsResponseDto = new FetchUserEventsResponseDto();
        LoggedUserDetails loggedUserDetails = this.authService.getLoggedUserDetails();
        List<Event> currentUserEvents = this.eventService.fetchCurrentUserEvents();
        for (Event event : currentUserEvents) {
            List<Ticket> userTickets = event.getTickets().stream().filter(ticket -> ticket.getUser() != null && Objects.equals(ticket.getUser().getUserId(), loggedUserDetails.getUserId())).collect(Collectors.toList());
            event.setTickets(userTickets);
        }
        fetchUserEventsResponseDto.setEvents(currentUserEvents.stream().map(EventDto::fromEvent).collect(Collectors.toList()));
        Log.info("End AccountActions.doFetchUserEvents");
        return fetchUserEventsResponseDto;
    }

}