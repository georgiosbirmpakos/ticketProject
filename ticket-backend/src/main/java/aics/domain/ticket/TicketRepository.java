package aics.domain.ticket;

import aics.domain.ticket.entities.Ticket;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class TicketRepository implements PanacheRepository<Ticket> {

    public Long deleteList(List<Ticket> tickets) {
        List<Long> ticketsIds = tickets.stream().map(Ticket::getTicketId).toList();
        return this.delete("ticketId in ?", ticketsIds);
    }

}