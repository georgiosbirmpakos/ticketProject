package aics.domain.provider.entities;

import aics.domain.hall.entities.Hall;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "PROVIDERS")
@Getter
@Setter
@Accessors(chain = true)
public class Provider {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PROVIDER_ID")
    private Long providerId;
    @Column(name = "NAME", nullable = false, length = 255, unique = true)
    private String name;
    @Column(name = "ADDRESS", nullable = false, length = 255)
    private String address;
    @Column(name = "PHONE", nullable = false, length = 255)
    private String phone;
    @Column(name = "DESCRIPTION", nullable = false, length = 255)
    private String description;

    // ASSOCIATIONS
    @OneToMany(mappedBy = "provider", fetch = FetchType.LAZY)
    private List<Hall> halls = new ArrayList<>();
}
