package aics.server.api.admin.halls.dtos;

import aics.domain.hall.dtos.HallDto;
import aics.domain.hall.dtos.HallListItemDto;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;

@Data
@Accessors(chain = true)
public class FetchHallDetailsResponseDto implements Serializable {
    private HallDto hall;
}
