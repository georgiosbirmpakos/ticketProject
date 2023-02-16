package aics.domain.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum RoleEnum {
    TICKET_USER(Values.TICKET_USER),
    TICKET_ADMIN(Values.TICKET_ADMIN),
    default_roles_ticket(Values.default_roles_ticket),
    offline_access(Values.offline_access),
    uma_authorization(Values.uma_authorization);

    public static class Values {
        public static final String TICKET_USER = "TICKET_USER";
        public static final String TICKET_ADMIN = "TICKET_ADMIN";
        public static final String default_roles_ticket = "default-roles-ticket";
        public static final String offline_access = "offline_access";
        public static final String uma_authorization = "uma_authorization";
    }

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
