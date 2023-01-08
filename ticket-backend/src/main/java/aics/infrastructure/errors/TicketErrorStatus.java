package aics.infrastructure.errors;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.ws.rs.core.Response;

@Getter
@AllArgsConstructor
public enum TicketErrorStatus implements Response.StatusType {
    BAD_REQUEST_400(400, Response.Status.Family.CLIENT_ERROR),
    UNAUTHORIZED_401(401, Response.Status.Family.CLIENT_ERROR),
    FORBIDDEN_403(403, Response.Status.Family.CLIENT_ERROR),
    UNPROCESSABLE_ENTITY_422(422, Response.Status.Family.CLIENT_ERROR),
    INTERNAL_SERVER_ERROR_500(500, Response.Status.Family.SERVER_ERROR);

    private final int statusCode;
    private final Response.Status.Family family;

    @Override
    public Response.Status.Family getFamily() {
        return null;
    }

    @Override
    public String getReasonPhrase() {
        return "";
    }
}
