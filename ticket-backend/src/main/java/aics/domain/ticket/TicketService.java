package aics.domain.ticket;

import aics.domain.ticket.entities.Ticket;
import org.apache.commons.collections4.CollectionUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class TicketService {
    @Inject
    TicketRepository ticketRepository;

    public List<Ticket> fetchTicketsByIds(List<Long> ticketsIds) {
        if (CollectionUtils.isEmpty(ticketsIds)) {
            return new ArrayList<>();
        }
        return this.ticketRepository.findByIds(ticketsIds);
    }
}