package aics.domain.event.dtos;

import aics.domain.movie.dtos.MovieListItemDto;
import aics.infrastructure.core.LabelValue;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@Accessors(chain = true)
public class EventOptionsDto implements Serializable {
    private List<MovieListItemDto> moviesRefs = new ArrayList<>();
    private List<LabelValue<Long>> hallsRefs = new ArrayList<>();
}
