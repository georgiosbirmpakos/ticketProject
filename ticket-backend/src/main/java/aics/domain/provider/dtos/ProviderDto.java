package aics.domain.provider.dtos;

import aics.domain.hall.dtos.HallListItemDto;
import aics.domain.provider.entities.Provider;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Accessors(chain = true)
public class ProviderDto implements Serializable {
    private Long providerId;
    private String name;
    private String address;
    private String phone;
    private String description;
    private String googleMapsSrc;
    private List<HallListItemDto> halls;

    public static ProviderDto fromProvider(Provider provider) {
        if (provider == null) {
            return null;
        }
        return new ProviderDto()
            .setProviderId(provider.getProviderId())
            .setName(provider.getName())
            .setAddress(provider.getAddress())
            .setPhone(provider.getPhone())
            .setDescription(provider.getDescription())
            .setGoogleMapsSrc(provider.getGoogleMapsSrc())
            .setHalls(provider.getHalls().stream().map(HallListItemDto::fromHall).collect(Collectors.toList()));
    }
}
