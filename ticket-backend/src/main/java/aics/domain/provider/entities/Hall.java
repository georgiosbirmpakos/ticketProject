package aics.domain.provider.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;

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
    @Column(name = "DESCRIPTION", nullable = true, length = 255)
    private String description;

    // ASSOCIATIONS
    @ManyToOne
    @JoinColumn(name = "PROVIDER_ID_FK", nullable = false, updatable = false)
    private Provider provider;
}
