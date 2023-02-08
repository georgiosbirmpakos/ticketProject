package aics.server.api.events.dtos;

import lombok.Data;
import lombok.experimental.Accessors;
import org.jboss.resteasy.reactive.RestQuery;

import java.io.Serializable;
import java.time.ZonedDateTime;

@Data
@Accessors(chain = true)
public class FetchEventsFilteredRequestDto implements Serializable {
    @RestQuery
    private Long movieId;
    @RestQuery
    private Long providerId;
    @RestQuery
    private ZonedDateTime fromDate;
    @RestQuery
    private ZonedDateTime toDate;
}
