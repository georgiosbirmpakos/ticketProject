package aics.domain.ticket;

import aics.domain.event.Event;
import aics.domain.provider.Seat;
import aics.domain.user.User;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "TICKETS")
@Getter
@Setter
@Accessors(chain = true)
public class Ticket {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TICKET_ID")
    private Long ticketId;
    @Column(name = "PAID_PRICE", nullable = false, precision = 10, scale = 2)
    private Double paidPrice;
    @Column(name = "DATE_OF_BOOKING", nullable = true)
    private LocalDateTime dateOfBooking;
    @Column(name = "DESCRIPTION", nullable = true, length = 255)
    private String description;

    // ASSOCIATIONS
    @ManyToOne
    @JoinColumn(name = "EVENT_ID_FK", nullable = false, updatable = false)
    private Event event;
    @ManyToOne
    @JoinColumn(name = "SEAT_ID_FK", nullable = false, updatable = false)
    private Seat seat;
    @ManyToOne
    @JoinColumn(name = "USER_ID_FK", nullable = false, updatable = false)
    private User user;
}
