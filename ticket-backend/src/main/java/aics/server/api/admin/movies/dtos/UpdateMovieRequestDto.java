package aics.server.api.admin.movies.dtos;

import aics.domain.movie.dtos.MovieDto;
import lombok.Data;
import lombok.experimental.Accessors;
import java.io.Serializable;

@Data
@Accessors(chain = true)
public class UpdateMovieRequestDto implements Serializable {

    private MovieDto movie;
}
