package aics.domain.ticket.dtos;

import aics.domain.ticket.entities.Ticket;
import aics.infrastructure.core.LabelValue;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
public class TicketDto implements Serializable {
    private Long ticketId;
    private LocalDateTime dateOfBooking;
    private String description;

    private LabelValue<Long> eventRef;
    private LabelValue<Long> seatRef;
    private int seatRow;
    private int seatColumn;
    private LabelValue<Long> userRef;

    public static TicketDto fromTicket(Ticket ticket) {
        if (ticket == null) {
            return null;
        }
        LabelValue<Long> eventRef = ticket.getEvent() != null
            ? new LabelValue<>(ticket.getEvent().getName(), ticket.getEvent().getEventId())
            : null;
        LabelValue<Long> seatRef = ticket.getSeat() != null
            ? new LabelValue<>(String.valueOf(ticket.getSeat().getSeatRow()) + String.valueOf(ticket.getSeat().getSeatColumn()), ticket.getSeat().getSeatId())
            : null;
        LabelValue<Long> userRef = ticket.getUser() != null
            ? new LabelValue<>(ticket.getUser().getName(), ticket.getUser().getUserId())
            : null;
        return new TicketDto()
            .setTicketId(ticket.getTicketId())
            .setDateOfBooking(ticket.getDateOfBooking())
            .setDescription(ticket.getDescription())
            .setEventRef(eventRef)
            .setSeatRef(seatRef)
            .setSeatRow(ticket.getSeat().getSeatRow())
            .setSeatColumn(ticket.getSeat().getSeatColumn())
            .setUserRef(userRef);
    }
}
