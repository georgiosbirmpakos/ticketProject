package aics.domain.provider;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;

@Entity(name = "SEATS")
@Getter
@Setter
@Accessors(chain = true)
public class Seat {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SEAT_ID")
    private Long seatId;
    @Column(name = "SEAT_ROW", nullable = false)
    private int seatRow;
    @Column(name = "SEAT_COLUMN", nullable = false)
    private int seatColumn;
    @Column(name = "FLOOR", nullable = false)
    private int floor;
    @Column(name = "DESCRIPTION", nullable = true, length = 255)
    private String description;

    // ASSOCIATIONS
    @ManyToOne
    @JoinColumn(name = "HALL_ID_FK", nullable = false, updatable = false)
    private Hall hall;
}
