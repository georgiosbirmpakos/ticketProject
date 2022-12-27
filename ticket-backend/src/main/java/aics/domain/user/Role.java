package aics.domain.user;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;

@Entity(name = "ROLES")
@Getter
@Setter
@Accessors(chain = true)
public class Role {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ROLE_ID")
    private Long roleId;
    @Column(name = "NAME", nullable = false, length = 255, unique = true)
    private String name;
    @Column(name = "DESCRIPTION", nullable = false, length = 255)
    private String description;

}
