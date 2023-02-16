package aics.infrastructure.auth;

import aics.domain.user.RoleEnum;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.Set;

@Data
@Accessors(chain = true)
public class LoggedUserDetails {
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
