package aics.domain.movie.dtos;

import aics.domain.movie.entities.Movie;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Base64;

@Data
@Accessors(chain = true)
public class MovieDto implements Serializable {
    private Long movieId;
    private String name;
    private String description;
    private String image;
    private String imageName;
    private String imageMimePrefix;
    private String directors;
    private String script;
    private String actors;
    private String appropriateness;
    private int duration;
    private String trailerSrcUrl;
    private int year;

    public static MovieDto fromMovie(Movie movie) {
        if (movie == null) {
            return null;
        }
        return new MovieDto()
            .setMovieId(movie.getMovieId())
            .setName(movie.getName())
            .setDescription(movie.getDescription())
            .setImage(Base64.getEncoder().encodeToString(movie.getImage()))
            .setImageName(movie.getImageName())
            .setImageMimePrefix(movie.getImageMimePrefix())
            .setDirectors(movie.getDirectors())
            .setScript(movie.getScript())
            .setActors(movie.getActors())
            .setAppropriateness(movie.getAppropriateness())
            .setDuration(movie.getDuration())
            .setTrailerSrcUrl(movie.getTrailerSrcUrl())
            .setYear(movie.getYear());
    }
}
