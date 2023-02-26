package aics.infrastructure.auth;

import aics.domain.user.RoleEnum;
import aics.domain.user.entities.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.util.Set;

@Getter
@Setter
@ToString
@Accessors(chain = true)
public class LoggedUserDetails {
    private User user;
    private Long userId;
    private String name;
    private String sub;
    private String email;
    private String preferredUsername;
    private String givenName;
    private String familyName;
    private String fullName;
    private Set<RoleEnum> roles;
}
