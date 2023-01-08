package aics.infrastructure.errors;

import lombok.Getter;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Getter
@Accessors(chain = true)
public class TicketException extends Exception {
    private final TicketErrorStatus status;
    private final Serializable errors;

    public TicketException(Exception e) {
        super(e);
        this.errors = null;
        this.status = TicketErrorStatus.INTERNAL_SERVER_ERROR_500;
    }

    public TicketException(Exception e, Serializable errors) {
        super(e);
        this.errors = errors;
        this.status = TicketErrorStatus.INTERNAL_SERVER_ERROR_500;
    }

    public TicketException(Exception e, TicketErrorStatus status) {
        super(e);
        this.errors = null;
        this.status = status;
    }

    public TicketException(Exception e, Serializable errors, TicketErrorStatus status) {
        super(e);
        this.errors = errors;
        this.status = status;
    }
}
