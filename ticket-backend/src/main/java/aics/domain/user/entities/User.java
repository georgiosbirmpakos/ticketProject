package aics.domain.user.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "USERS")
@Getter
@Setter
@Accessors(chain = true)
public class User {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID")
    private Long userId;
    @Column(name = "NAME", nullable = false, length = 255)
    private String name;
    @Column(name = "EMAIL", nullable = true, length = 255)
    private String email;
    @Column(name = "DETAILS", nullable = true, length = 255)
    private String details;
    @Column(name = "CREATED_ON", nullable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;
    @Column(name = "UPDATED_ON", nullable = false)
    @UpdateTimestamp
    private LocalDateTime updatedOn;

    // ASSOCIATIONS

    @OneToMany(mappedBy = "user")
    private List<UserNotification> userNotifications = new ArrayList<>();
}
