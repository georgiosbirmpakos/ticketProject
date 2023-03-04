package aics.domain.ticket;

import aics.domain.ticket.entities.Ticket;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.panache.common.Parameters;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class TicketRepository implements PanacheRepository<Ticket> {

    public Long deleteList(List<Ticket> tickets) {
        List<Long> ticketsIds = tickets.stream().map(Ticket::getTicketId).toList();
        Parameters parameters = Parameters.with("ticketsIds", ticketsIds);
        return this.delete("ticketId in :ticketsIds", parameters);
    }

    public List<Ticket> findByIds(List<Long> ticketsIds) {
        Parameters parameters = new Parameters();
        String queryString = "ticketId in :ticketsIds";
        parameters.and("ticketsIds", ticketsIds);
        return find(queryString, parameters).list();
    }

    public Long deleteBySeatIds(List<Long> seatIds) {
        Parameters parameters = Parameters.with("seatIds", seatIds);
        return delete("seat.seatId in :seatIds", parameters);
    }
}