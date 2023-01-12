package aics.domain.user.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
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
    @Column(name = "SURNAME", nullable = false, length = 255)
    private String surname;
    @Column(name = "GMAIL", nullable = true, length = 255)
    private String gmail;
    @Column(name = "DETAILS", nullable = true, length = 255)
    private String details;

    // ASSOCIATIONS

    @OneToMany(mappedBy = "user")
    private List<UserRoleLink> userRoles = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserNotification> userNotifications = new ArrayList<>();
}
