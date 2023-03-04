package aics.domain.hall.entities;

import aics.domain.provider.entities.Provider;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "HALLS")
@Getter
@Setter
@Accessors(chain = true)
public class Hall {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "HALL_ID")
    private Long hallId;
    @Column(name = "NAME", nullable = false, length = 255)
    private String name;
    @Column(name = "DESCRIPTION", nullable = false, length = 2048)
    private String description;
    @Column(name = "SEATS_ROWS", nullable = false)
    private int seatsRows;
    @Column(name = "SEATS_COLUMNS", nullable = false)
    private int seatsColumns;
    @Column(name = "CREATED_ON", nullable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;
    @Column(name = "UPDATED_ON", nullable = false)
    @UpdateTimestamp
    private LocalDateTime updatedOn;

    // ASSOCIATIONS
    @ManyToOne
    @JoinColumn(name = "PROVIDER_ID_FK", nullable = false, updatable = false)
    private Provider provider;
    @OneToMany(mappedBy = "hall")
    private List<Seat> seats = new ArrayList<>();
}
