package aics.domain.movie.models;

import aics.domain.movie.Movie;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Base64;

@Data
@Accessors(chain = true)
public class MovieModel implements Serializable {
    private Long movieId;
    private String name;
    private String description;
    private String image;

    public static MovieModel fromMovie(Movie movie) {
        if (movie == null) {
            return null;
        }
        return new MovieModel()
            .setMovieId(movie.getMovieId())
            .setName(movie.getName())
            .setDescription(movie.getDescription())
            .setImage(Base64.getEncoder().encodeToString(movie.getImage()));
    }
}
