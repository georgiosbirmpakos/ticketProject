package aics.domain.hall.dtos;

import aics.domain.hall.entities.Hall;
import aics.domain.hall.entities.Seat;
import aics.infrastructure.core.LabelValue;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Accessors(chain = true)
public class HallDto implements Serializable {
    private Long hallId;
    private String name;
    private String description;
    private int seatsRows;
    private int seatsColumns;
    private List<SeatListItemDto> seats = new ArrayList<>();
    private LabelValue<Long> providerRef;

    public static HallDto fromHall(Hall hall, List<Seat> seats) {
        if (hall == null) {
            return null;
        }
        LabelValue<Long> providerRef = hall.getProvider() != null
            ? new LabelValue<>(hall.getProvider().getName(), hall.getProvider().getProviderId())
            : null;
        return new HallDto()
            .setHallId(hall.getHallId())
            .setName(hall.getName())
            .setDescription(hall.getDescription())
            .setSeatsRows(hall.getSeatsRows())
            .setSeatsColumns(hall.getSeatsColumns())
            .setSeats(seats.stream().map(SeatListItemDto::fromSeat).collect(Collectors.toList()))
            .setProviderRef(providerRef);
    }
}
