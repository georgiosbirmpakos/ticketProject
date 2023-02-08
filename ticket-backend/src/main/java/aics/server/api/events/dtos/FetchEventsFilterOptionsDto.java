package aics.server.api.events.dtos;

import aics.domain.event.dtos.EventsFilterOptionsDto;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@Accessors(chain = true)
public class FetchEventsFilterOptionsDto implements Serializable {

    private EventsFilterOptionsDto options;
}
