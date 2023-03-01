package aics.domain.ticket.entities;

import aics.domain.event.entities.Event;
import aics.domain.hall.entities.Seat;
import aics.domain.user.entities.User;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
    @Column(name = "DATE_OF_BOOKING", nullable = true)
    private LocalDateTime dateOfBooking;
    @Column(name = "DESCRIPTION", nullable = true, length = 2048)
    private String description;
    @Column(name = "CREATED_ON", nullable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;
    @Column(name = "UPDATED_ON", nullable = false)
    @UpdateTimestamp
    private LocalDateTime updatedOn;

    // ASSOCIATIONS
    @ManyToOne
    @JoinColumn(name = "EVENT_ID_FK", nullable = false, updatable = false)
    private Event event;
    @ManyToOne
    @JoinColumn(name = "SEAT_ID_FK", nullable = false, updatable = false)
    private Seat seat;
    @ManyToOne
    @JoinColumn(name = "USER_ID_FK", nullable = true, updatable = true)
    private User user;
}
