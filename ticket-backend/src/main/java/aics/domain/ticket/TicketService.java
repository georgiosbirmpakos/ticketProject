package aics.domain.ticket;

import aics.domain.ticket.entities.Ticket;
import aics.infrastructure.auth.AuthService;
import aics.infrastructure.auth.LoggedUserDetails;
import org.apache.commons.collections4.CollectionUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class TicketService {
    @Inject
    private TicketRepository ticketRepository;
    @Inject
    private TicketValidator ticketValidator;
    @Inject
    private AuthService authService;

    public List<Ticket> fetchTicketsByIds(List<Long> ticketsIds) {
        if (CollectionUtils.isEmpty(ticketsIds)) {
            return new ArrayList<>();
        }
        return this.ticketRepository.findByIds(ticketsIds);
    }

    public List<String> bookTickets(List<Ticket> tickets) {
        List<String> errors = this.ticketValidator.validateForBookTicket(tickets);
        if (CollectionUtils.isNotEmpty(errors)) {
            return errors;
        }

        LoggedUserDetails loggedUserDetails = this.authService.getLoggedUserDetails();
        if (loggedUserDetails == null) {
            errors.add("user is not logged in");
            return errors;
        }

        if (loggedUserDetails.getUser() == null) {
            errors.add("user was null");
            return errors;
        }

        for (Ticket ticket : tickets) {
            ticket.setUser(loggedUserDetails.getUser());
        }

        this.ticketRepository.persist(tickets);

        return errors;
    }
}