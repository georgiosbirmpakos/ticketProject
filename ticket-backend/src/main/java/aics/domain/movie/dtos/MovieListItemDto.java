package aics.domain.movie.dtos;

import aics.domain.movie.entities.Movie;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Base64;

@Data
@Accessors(chain = true)
public class MovieListItemDto implements Serializable {
    private Long movieId;
    private String name;
    private String description;
    private String image;
    private String imageName;
    private String imageMimePrefix;
    private int year;

    public static MovieListItemDto fromMovie(Movie movie) {
        if (movie == null) {
            return null;
        }
        return new MovieListItemDto()
            .setMovieId(movie.getMovieId())
            .setName(movie.getName())
            .setDescription(movie.getDescription())
            .setImage(Base64.getEncoder().encodeToString(movie.getImage()))
            .setImageName(movie.getImageName())
            .setImageMimePrefix(movie.getImageMimePrefix())
            .setYear(movie.getYear());
    }
}
