package aics.server.api.admin.halls.dtos;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@Accessors(chain = true)
public class DeleteHallResponseDto implements Serializable {
    private List<String> errors = new ArrayList<>();
}
