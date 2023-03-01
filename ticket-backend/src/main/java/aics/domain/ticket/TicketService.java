package aics.domain.ticket;

import aics.domain.ticket.entities.Ticket;
import aics.infrastructure.auth.AuthService;
import aics.infrastructure.auth.LoggedUserDetails;
import io.quarkus.logging.Log;
import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
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
    @Inject
    Mailer mailer;

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

        try {
            this.sendSuccessMail(loggedUserDetails, tickets);
        } catch (Exception e) {
            Log.error(e);
            // don't stop flow on email error
        }
        return errors;
    }

    private void sendSuccessMail(LoggedUserDetails loggedUserDetails, List<Ticket> tickets) {
        String body = "<h1>Επιτυχής αγορά Εισιτηρίων!</h1><br>";
        body += "<p>Αγοράσατε " + tickets.size() + " εισιτήρια</p><br>";

        double totalCost = tickets.size() * tickets.get(0).getEvent().getEventPrice();
        body += "<p>Συνολικό κόστος: " + totalCost + " €</p><br>";
        body += "<p>Θέσεις Εισιτηρίων:</p><br>";
        body += "<ul>";
        for (Ticket ticket : tickets) {
            body += "<li>" + ticket.getSeat().getSeatRow() + "-" + ticket.getSeat().getSeatColumn() + "</li>";
        }
        body += "</ul><br>";

        mailer.send(Mail.withHtml(loggedUserDetails.getEmail(), "Επιτυχής αγορά Εισιτηρίων!", body));
    }
}