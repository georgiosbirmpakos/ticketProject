package aics.domain.hall.dtos;

import aics.domain.hall.entities.Hall;
import aics.infrastructure.core.LabelValue;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@Accessors(chain = true)
public class HallListItemDto implements Serializable {
    private Long hallId;
    private String name;
    private String description;
    private int seatsRows;
    private int seatsColumns;
    private LabelValue<Long> providerRef;

    public static HallListItemDto fromHall(Hall hall) {
        if (hall == null) {
            return null;
        }
        LabelValue<Long> providerRef = hall.getProvider() != null
            ? new LabelValue<>(hall.getProvider().getName(), hall.getProvider().getProviderId())
            : null;
        return new HallListItemDto()
            .setHallId(hall.getHallId())
            .setName(hall.getName())
            .setDescription(hall.getDescription())
            .setSeatsRows(hall.getSeatsRows())
            .setSeatsColumns(hall.getSeatsColumns())
            .setProviderRef(providerRef);
    }
}
