package aics.domain.provider;

import aics.domain.provider.dtos.ProviderDto;
import aics.domain.provider.entities.Provider;
import org.apache.commons.lang3.StringUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;

@ApplicationScoped
public class ProviderService {
    @Inject
    private ProviderRepository providerRepository;
    @Inject
    private ProviderValidator providerValidator;

    public List<Provider> fetchAllProviders() {
        List<Provider> providers = this.providerRepository.findAll().list();

        return providers;
    }


    public Provider fetchProviderById(Long providerId) {
        Provider provider = this.providerRepository.findById(providerId);

        return provider;
    }

    public String createProvider(ProviderDto providerDto) {

        final String error = this.providerValidator.validateForCreateProvider(providerDto);
        if (StringUtils.isNotEmpty(error)) {
            return error;
        }

        Provider newProvider = new Provider()
            .setName(providerDto.getName())
            .setAddress(providerDto.getAddress())
            .setPhone(providerDto.getPhone())
            .setDescription(providerDto.getDescription())
            .setGoogleMapsSrc(providerDto.getGoogleMapsSrc());

        this.providerRepository.persist(newProvider);

        return null;
    }


    public String updateProvider(ProviderDto providerDto) {

        final String error = this.providerValidator.validateForUpdateProvider(providerDto);
        if (StringUtils.isNotEmpty(error)) {
            return error;
        }

        Provider provider = this.providerRepository.findById(providerDto.getProviderId());
        if (provider == null) {
            return "couldn't find provider";
        }

        provider.setProviderId(providerDto.getProviderId())
            .setName(providerDto.getName())
            .setAddress(providerDto.getAddress())
            .setPhone(providerDto.getPhone())
            .setDescription(providerDto.getDescription())
            .setGoogleMapsSrc(providerDto.getGoogleMapsSrc());

        this.providerRepository.persist(provider);

        return null;
    }

    public String deleteProviderById(Long providerId) {
        if (providerId == null) {
            return "providerId was null";
        }
        Provider provider = this.providerRepository.findById(providerId);
        if (provider == null) {
            return "couldn't find provider";
        }
        this.providerRepository.delete(provider);

        return null;
    }
}