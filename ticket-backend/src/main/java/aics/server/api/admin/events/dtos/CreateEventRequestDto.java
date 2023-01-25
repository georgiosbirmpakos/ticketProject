package aics.server.api.admin.events.dtos;

import aics.domain.event.dtos.EventDto;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@Accessors(chain = true)
public class CreateEventRequestDto implements Serializable {
    private EventDto event;
}
