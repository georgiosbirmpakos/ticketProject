package aics.domain.provider.entities;

import aics.domain.hall.entities.Hall;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
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
    @Column(name = "GOOGLE_MAPS_SRC", nullable = false, length = 1024)
    private String googleMapsSrc;
    @Column(name = "PHONE", nullable = false, length = 255)
    private String phone;
    @Column(name = "DESCRIPTION", nullable = false, length = 2048)
    private String description;
    @Column(name = "CREATED_ON", nullable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;
    @Column(name = "UPDATED_ON", nullable = false)
    @UpdateTimestamp
    private LocalDateTime updatedOn;

    // ASSOCIATIONS
    @OneToMany(mappedBy = "provider", fetch = FetchType.LAZY)
    private List<Hall> halls = new ArrayList<>();
}
