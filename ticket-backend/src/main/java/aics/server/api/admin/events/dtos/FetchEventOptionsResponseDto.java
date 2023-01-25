package aics.server.api.admin.events.dtos;

import aics.domain.event.dtos.EventOptionsDto;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@Accessors(chain = true)
public class FetchEventOptionsResponseDto implements Serializable {
    private EventOptionsDto options;
}
