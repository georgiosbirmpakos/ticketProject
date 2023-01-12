package aics.domain.event.entities;

import aics.domain.movie.entities.Movie;
import aics.domain.provider.entities.Hall;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    @Column(name = "DESCRIPTION", nullable = true, length = 255)
    private String description;
    @Column(name = "EVENT_PRICE", nullable = false, precision = 10, scale = 2)
    private Double eventPrice;

    // ASSOCIATIONS
    @ManyToOne
    @JoinColumn(name = "MOVIE_ID_FK", nullable = false, updatable = false)
    private Movie movie;
    @ManyToOne
    @JoinColumn(name = "HALL_ID_FK", nullable = false, updatable = false)
    private Hall hall;
}
