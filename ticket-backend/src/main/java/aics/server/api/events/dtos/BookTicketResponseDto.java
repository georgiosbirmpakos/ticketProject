package aics.server.api.events.dtos;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;

@Data
@Accessors(chain = true)
public class BookTicketResponseDto implements Serializable {
    private List<String> errors;
}
