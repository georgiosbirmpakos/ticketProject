package aics.domain.provider.dtos;

import aics.domain.provider.entities.Provider;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@Accessors(chain = true)
public class ProviderListItemDto implements Serializable {
    private Long providerId;
    private String name;
    private String address;
    private String phone;
    private String description;
    private String googleMapsSrc;

    public static ProviderListItemDto fromProvider(Provider provider) {
        if (provider == null) {
            return null;
        }
        return new ProviderListItemDto()
            .setProviderId(provider.getProviderId())
            .setName(provider.getName())
            .setAddress(provider.getAddress())
            .setPhone(provider.getPhone())
            .setDescription(provider.getDescription())
            .setGoogleMapsSrc(provider.getGoogleMapsSrc());
    }
}
