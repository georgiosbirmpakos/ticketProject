package aics.domain.event.models;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
public class EventFilters implements Serializable {
    private Long movieId;
    private Long providerId;
    private LocalDateTime fromDate;
    private LocalDateTime toDate;

}
