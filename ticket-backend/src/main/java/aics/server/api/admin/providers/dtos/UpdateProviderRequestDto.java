package aics.server.api.admin.providers.dtos;

import aics.domain.provider.dtos.ProviderDto;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@Accessors(chain = true)
public class UpdateProviderRequestDto implements Serializable {
    private ProviderDto provider;
}
