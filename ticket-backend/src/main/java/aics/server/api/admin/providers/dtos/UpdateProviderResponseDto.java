package aics.server.api.admin.providers.dtos;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;

@Data
@Accessors(chain = true)
public class UpdateProviderResponseDto implements Serializable {
    private List<String> errors;
}
