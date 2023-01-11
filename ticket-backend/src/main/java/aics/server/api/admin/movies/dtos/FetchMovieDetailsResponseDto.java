package aics.server.api.admin.movies.dtos;

import aics.domain.movie.dtos.MovieDto;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;

@Data
@Accessors(chain = true)
public class FetchMovieDetailsResponseDto implements Serializable {
    private MovieDto movie;
}
