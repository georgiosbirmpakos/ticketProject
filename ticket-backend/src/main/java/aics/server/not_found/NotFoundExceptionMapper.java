package aics.server.not_found;

import org.jboss.resteasy.reactive.RestResponse;

import javax.ws.rs.NotFoundException;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;
import java.nio.charset.StandardCharsets;
import java.util.Objects;
import java.util.Scanner;

@Provider
public class NotFoundExceptionMapper implements ExceptionMapper<NotFoundException> {
    @Override
    @Produces(MediaType.TEXT_HTML)
    public Response toResponse(NotFoundException exception) {
        String text = new Scanner(Objects.requireNonNull(this.getClass().getResourceAsStream("/META-INF/resources/index.html")), StandardCharsets.UTF_8).useDelimiter("\\A").next();
        if (text == null) {
            return Response.status(RestResponse.Status.NOT_FOUND).build();
        } else {
            return Response.ok().header("Content-Type", "text/html").entity(text).build();
        }
    }
}