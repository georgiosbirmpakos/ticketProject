package aics.infrastructure.auth;

import aics.domain.user.RoleEnum;
import aics.domain.user.UserRepository;
import aics.domain.user.entities.User;
import io.quarkus.security.identity.SecurityIdentity;
import org.apache.commons.lang3.StringUtils;
import org.eclipse.microprofile.jwt.Claims;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.security.Principal;
import java.util.Set;
import java.util.stream.Collectors;

@ApplicationScoped
public class AuthService {
    @Inject
    private SecurityIdentity securityIdentity;
    @Inject
    private JsonWebToken jwt;
    @Inject
    private UserRepository userRepository;

    public Principal getPrincipal() {
        return this.securityIdentity.getPrincipal();
    }

    public Set<RoleEnum> getRoles() {
        Set<String> rolesStr = this.securityIdentity.getRoles();
        return rolesStr.stream().map(RoleEnum::fromValue).collect(Collectors.toSet());
    }

    public LoggedUserDetails getLoggedUserDetails() {
        if (this.securityIdentity.isAnonymous()) {
            return null;
        }

        Principal principal = this.getPrincipal();
        Set<RoleEnum> roles = this.getRoles();

        String name = principal.getName();
        String email = jwt.getClaim(Claims.email);

        User user = this.userRepository.findByName(name).orElse(null);
        if (user == null) {
            user = new User()
                .setName(name)
                .setEmail(email);
            this.userRepository.persist(user);
        } else {
            if (!StringUtils.equals(user.getEmail(), email)) {
                user.setEmail(email);
                this.userRepository.persist(user);
            }
        }

        String givenName = jwt.getClaim(Claims.given_name) != null ? jwt.getClaim(Claims.given_name) : "";
        String familyName = jwt.getClaim(Claims.family_name) != null ? jwt.getClaim(Claims.family_name) : "";
        String fullName = StringUtils.isNotEmpty(jwt.getClaim(Claims.full_name))
            ? jwt.getClaim(Claims.full_name)
            : givenName + " " + familyName;

        LoggedUserDetails loggedUserDetails = new LoggedUserDetails()
            .setUser(user)
            .setUserId(user.getUserId())
            .setName(name)
            .setSub(jwt.getClaim(Claims.sub))
            .setEmail(email)
            .setPreferredUsername(jwt.getClaim(Claims.preferred_username))
            .setGivenName(givenName)
            .setFamilyName(familyName)
            .setFullName(fullName)
            .setRoles(roles);

        return loggedUserDetails;
    }
}