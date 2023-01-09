package aics.domain.movie;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;

@Entity(name = "MOVIES")
@Getter
@Setter
@Accessors(chain = true)
public class Movie {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MOVIE_ID")
    private Long movieId;
    @Column(name = "NAME", nullable = false, length = 255)
    private String name;
    @Column(name = "DESCRIPTION", nullable = true, length = 255)
    private String description;
    @Column(name = "IMAGE", nullable = false)
    @Lob
    private byte[] image;
    @Column(name = "DIRECTORS", nullable = false, length = 255)
    private String directors;
    @Column(name = "SCRIPT", nullable = false, length = 255)
    private String script;
    @Column(name = "ACTORS", nullable = false, length = 255)
    private String actors;
    @Column(name = "APPROPRIATENESS", nullable = false, length = 255)
    private String appropriateness;
    @Column(name = "DURATION", nullable = false, length = 255)
    private int duration;
}
