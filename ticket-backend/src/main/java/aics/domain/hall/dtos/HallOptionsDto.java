package aics.domain.hall.dtos;

import aics.infrastructure.core.LabelValue;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@Accessors(chain = true)
public class HallOptionsDto implements Serializable {
    private List<LabelValue<Long>> providersRefs = new ArrayList<>();
}
