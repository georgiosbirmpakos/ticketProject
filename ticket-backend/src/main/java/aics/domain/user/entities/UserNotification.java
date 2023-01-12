package aics.domain.user.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;

@Entity(name = "USER_NOTIFICATIONS")
@Getter
@Setter
@Accessors(chain = true)
public class UserNotification {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_NOTIFICATION_ID")
    private Long userNotificationId;
    @Column(name = "MESSAGE", nullable = false, length = 255)
    private String message;
    @Column(name = "IS_READ", nullable = false)
    private boolean isRead;

    // ASSOCIATIONS
    @ManyToOne
    @JoinColumn(name = "USER_ID_FK", nullable = false, updatable = false)
    private User user;
}
