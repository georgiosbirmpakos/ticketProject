package aics.server.api.providers.dtos;

import aics.domain.provider.dtos.ProviderDto;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;

@Data
@Accessors(chain = true)
public class FetchProvidersListResponseDto implements Serializable {
    private List<ProviderDto> providers;
}
