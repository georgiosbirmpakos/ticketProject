package aics.domain.user;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;

@Entity(name = "USERS_ROLES_LINK")
@Table(uniqueConstraints = {
    @UniqueConstraint(name = "user_role_unique_constraint", columnNames = {
        "USER_ID_FK",
        "ROLE_ID_FK"
    })
})
@Getter
@Setter
@Accessors(chain = true)
public class UserRoleLink {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ROLE_LINK_ID")
    private Long userRoleLinkId;

    // ASSOCIATIONS

    @ManyToOne
    @JoinColumn(name = "USER_ID_FK", nullable = false, updatable = false)
    private User user;
    @ManyToOne
    @JoinColumn(name = "ROLE_ID_FK", nullable = false, updatable = false)
    private Role role;
}
