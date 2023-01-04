package aics.server.api.admin.movies.dtos;

import lombok.Data;
import lombok.experimental.Accessors;
import org.jboss.resteasy.reactive.PartType;
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.multipart.FileUpload;

import javax.ws.rs.core.MediaType;
import java.io.Serializable;

@Data
@Accessors(chain = true)
public class CreateMovieRequestDto implements Serializable {
    @RestForm("movieId")
    private Long movieId;
    @RestForm("name")
    private String name;
    @RestForm("description")
    private String description;
    @RestForm("image")
    @PartType(MediaType.APPLICATION_OCTET_STREAM)
    private byte[] image;
}
