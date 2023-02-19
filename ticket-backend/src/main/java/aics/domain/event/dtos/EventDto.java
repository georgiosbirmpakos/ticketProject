package aics.domain.event.dtos;

import aics.domain.event.entities.Event;
import aics.domain.movie.dtos.MovieListItemDto;
import aics.domain.ticket.dtos.TicketDto;
import aics.infrastructure.core.LabelValue;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Accessors(chain = true)
public class EventDto implements Serializable {
    private Long eventId;
    private String name;
    private LocalDateTime eventDatetime;
    private String description;
    private Double eventPrice;
    private MovieListItemDto movieRef;
    private LabelValue<Long> hallRef;
    private List<TicketDto> tickets;

    public static EventDto fromEvent(Event event) {
        if (event == null) {
            return null;
        }
        LabelValue<Long> hallRef = event.getHall() != null
            ? new LabelValue<>(event.getHall().getProvider().getName() + "-" + event.getHall().getName(), event.getHall().getHallId())
            : null;
        return new EventDto()
            .setEventId(event.getEventId())
            .setName(event.getName())
            .setEventDatetime(event.getEventDatetime())
            .setDescription(event.getDescription())
            .setEventPrice(event.getEventPrice())
            .setMovieRef(MovieListItemDto.fromMovie(event.getMovie()))
            .setHallRef(hallRef)
            .setTickets(event.getTickets().stream().map(TicketDto::fromTicket).collect(Collectors.toList()));
    }
}
