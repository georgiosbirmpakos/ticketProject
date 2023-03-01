package aics.domain.event.entities;

import aics.domain.hall.entities.Hall;
import aics.domain.movie.entities.Movie;
import aics.domain.ticket.entities.Ticket;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "EVENTS")
@Getter
@Setter
@Accessors(chain = true)
public class Event {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EVENT_ID")
    private Long eventId;
    @Column(name = "NAME", nullable = false, length = 255)
    private String name;
    @Column(name = "EVENT_DATETIME", nullable = false)
    private LocalDateTime eventDatetime;
    @Column(name = "DESCRIPTION", nullable = true, length = 2048)
    private String description;
    @Column(name = "EVENT_PRICE", nullable = false, precision = 10, scale = 2)
    private Double eventPrice;
    @Column(name = "CREATED_ON", nullable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;
    @Column(name = "UPDATED_ON", nullable = false)
    @UpdateTimestamp
    private LocalDateTime updatedOn;

    // ASSOCIATIONS
    @ManyToOne
    @JoinColumn(name = "MOVIE_ID_FK", nullable = false, updatable = false)
    private Movie movie;
    @ManyToOne
    @JoinColumn(name = "HALL_ID_FK", nullable = false, updatable = false)
    private Hall hall;

    @OneToMany(mappedBy = "event")
    private List<Ticket> tickets = new ArrayList<>();
}
