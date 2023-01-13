package aics.server.api.admin.halls.dtos;

import aics.domain.hall.dtos.HallListItemDto;
import aics.domain.provider.dtos.ProviderListItemDto;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;

@Data
@Accessors(chain = true)
public class FetchHallsListResponseDto implements Serializable {
    private List<HallListItemDto> halls;
}
