package aics.infrastructure.auth;

import aics.domain.user.RoleEnum;
import io.quarkus.security.identity.SecurityIdentity;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.security.Principal;
import java.util.Set;
import java.util.stream.Collectors;

@ApplicationScoped
public class AuthService {
    @Inject
    SecurityIdentity securityIdentity;

    public Principal getPrincipal() {
        return this.securityIdentity.getPrincipal();
    }

    public Set<RoleEnum> getRoles() {
        Set<String> rolesStr = this.securityIdentity.getRoles();
        return rolesStr.stream().map(RoleEnum::fromValue).collect(Collectors.toSet());
    }
}