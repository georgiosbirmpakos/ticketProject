package aics.server.api.admin.halls.dtos;

import aics.domain.hall.dtos.HallDto;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@Accessors(chain = true)
public class UpdateHallRequestDto implements Serializable {
    private HallDto hall;
}
