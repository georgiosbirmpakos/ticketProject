package aics.server.api.admin.movies.dtos;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;

@Data
@Accessors(chain = true)
public class UpdateMovieResponseDto implements Serializable {
    private List<String> errors;
}
