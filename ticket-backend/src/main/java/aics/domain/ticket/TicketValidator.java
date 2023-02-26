package aics.domain.ticket;

import aics.domain.event.entities.Event;
import aics.domain.ticket.entities.Ticket;
import org.apache.commons.collections4.CollectionUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@ApplicationScoped
public class TicketValidator {
    @Inject
    private TicketRepository ticketRepository;

    public List<String> validateForBookTicket(List<Ticket> tickets) {
        List<String> errors = new ArrayList<>();
        if (CollectionUtils.isEmpty(tickets)) {
            errors.add("tickets were empty");
            return errors;
        }
        Event event = tickets.get(0).getEvent();
        for (Ticket ticket : tickets) {
            if (!Objects.equals(ticket.getEvent().getEventId(), event.getEventId())) {
                errors.add("tickets don't have the same event");
                return errors;
            }
        }

        for (Ticket ticket : tickets) {
            if (ticket.getUser() != null) {
                errors.add("ticket is already bought by another user");
                return errors;
            }
        }

        if (event.getEventDatetime().isBefore(LocalDateTime.now())) {
            errors.add("event dateTime has expired");
            return errors;
        }


        return errors;
    }

}