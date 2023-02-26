package aics.infrastructure.auth;

import aics.domain.user.RoleEnum;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.Set;

@Data
@Accessors(chain = true)
public class LoggedUserDetailsDto {
    private Long userId;
    private String name;
    private String sub;
    private String email;
    private String preferredUsername;
    private String givenName;
    private String familyName;
    private String fullName;
    private Set<RoleEnum> roles;

    public static LoggedUserDetailsDto fromLoggedUserDetails(LoggedUserDetails loggedUserDetails) {
        return new LoggedUserDetailsDto()
            .setUserId(loggedUserDetails.getUserId())
            .setName(loggedUserDetails.getName())
            .setSub(loggedUserDetails.getSub())
            .setEmail(loggedUserDetails.getEmail())
            .setPreferredUsername(loggedUserDetails.getPreferredUsername())
            .setGivenName(loggedUserDetails.getGivenName())
            .setFamilyName(loggedUserDetails.getFamilyName())
            .setFullName(loggedUserDetails.getFullName())
            .setRoles(loggedUserDetails.getRoles());
    }
}
