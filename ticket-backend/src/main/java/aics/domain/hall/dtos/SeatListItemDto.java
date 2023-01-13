package aics.domain.hall.dtos;

import aics.domain.hall.entities.Seat;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@Accessors(chain = true)
public class SeatListItemDto implements Serializable {
    private Long seatId;
    private int seatRow;
    private int seatColumn;
    private String description;

    public static SeatListItemDto fromSeat(Seat seat) {
        if (seat == null) {
            return null;
        }
        return new SeatListItemDto()
            .setSeatId(seat.getSeatId())
            .setSeatRow(seat.getSeatRow())
            .setSeatColumn(seat.getSeatColumn())
            .setDescription(seat.getDescription());
    }
}
