package aics.server.api.movies.dtos;

import aics.domain.movie.dtos.MovieDto;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@Accessors(chain = true)
public class FetchMovieDetailsResponseDto implements Serializable {
    private MovieDto movie;
}
