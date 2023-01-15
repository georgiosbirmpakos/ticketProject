package aics.server.api.admin.halls.dtos;

import aics.domain.hall.dtos.HallOptionsDto;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@Accessors(chain = true)
public class FetchHallsOptionsResponseDto implements Serializable {
    private HallOptionsDto options;
}
