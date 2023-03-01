package aics.domain.hall.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    //    @Column(name = "FLOOR", nullable = false)
//    private int floor;
    @Column(name = "DESCRIPTION", nullable = true, length = 2048)
    private String description;
    @Column(name = "CREATED_ON", nullable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;
    @Column(name = "UPDATED_ON", nullable = false)
    @UpdateTimestamp
    private LocalDateTime updatedOn;

    // ASSOCIATIONS
    @ManyToOne
    @JoinColumn(name = "HALL_ID_FK", nullable = false, updatable = false)
    private Hall hall;
}
