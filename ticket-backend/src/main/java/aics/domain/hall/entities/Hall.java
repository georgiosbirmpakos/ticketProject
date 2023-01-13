package aics.domain.hall.entities;

import aics.domain.provider.entities.Provider;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
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
    @Column(name = "DESCRIPTION", nullable = false, length = 2000)
    private String description;
    @Column(name = "SEATS_ROWS", nullable = false)
    private int seatsRows;
    @Column(name = "SEATS_COLUMNS", nullable = false)
    private int seatsColumns;

    // ASSOCIATIONS
    @ManyToOne
    @JoinColumn(name = "PROVIDER_ID_FK", nullable = false, updatable = false)
    private Provider provider;
}
