package aics.domain.event.dtos;

import aics.infrastructure.core.LabelValue;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@Accessors(chain = true)
public class EventsFilterOptionsDto implements Serializable {

    private List<LabelValue<Long>> moviesRefs = new ArrayList<>();
    private List<LabelValue<Long>> providersRefs = new ArrayList<>();
}
