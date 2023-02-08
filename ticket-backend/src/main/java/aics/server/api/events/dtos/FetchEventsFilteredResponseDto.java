package aics.server.api.events.dtos;

import aics.domain.event.dtos.EventDto;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;

@Data
@Accessors(chain = true)
public class FetchEventsFilteredResponseDto implements Serializable {
    private List<EventDto> events;
}
