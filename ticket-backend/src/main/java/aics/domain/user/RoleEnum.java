package aics.domain.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum RoleEnum {
    TICKET_USER("TICKET_USER"),
    TICKET_ADMIN("TICKET_ADMIN"),
    default_roles_ticket("default-roles-ticket"),
    offline_access("offline_access"),
    uma_authorization("uma_authorization");

    private final String value;

    public static RoleEnum fromValue(String value) {
        if (value == null) {
            return null;
        }
        for (RoleEnum roleEnum : RoleEnum.values()) {
            if (roleEnum.getValue().equals(value)) {
                return roleEnum;
            }
        }
        return null;
    }
}
