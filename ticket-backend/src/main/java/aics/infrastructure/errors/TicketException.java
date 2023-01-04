package aics.infrastructure.errors;

import lombok.Getter;
import lombok.experimental.Accessors;
import org.jboss.resteasy.reactive.RestResponse;

import java.io.Serializable;

@Getter
@Accessors(chain = true)
public class TicketException extends Exception {
    private final RestResponse.Status status;
    private final Serializable errors;

    public TicketException(Exception e) {
        super(e);
        this.errors = null;
        this.status = RestResponse.Status.INTERNAL_SERVER_ERROR;
    }

    public TicketException(Exception e, Serializable errors) {
        super(e);
        this.errors = errors;
        this.status = RestResponse.Status.INTERNAL_SERVER_ERROR;
    }

    public TicketException(Exception e, RestResponse.Status status) {
        super(e);
        this.errors = null;
        this.status = status;
    }

    public TicketException(Exception e, Serializable errors, RestResponse.Status status) {
        super(e);
        this.errors = errors;
        this.status = status;
    }
}
