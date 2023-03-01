package aics.domain.provider;

import aics.domain.provider.dtos.ProviderDto;
import org.apache.commons.lang3.StringUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class ProviderValidator {
    @Inject
    private ProviderRepository providerRepository;

    public String validateForCreateProvider(ProviderDto providerDto) {
        final String error = this.validateMandatory(providerDto);
        if (StringUtils.isNotEmpty(error)) {
            return error;
        }
        if (providerDto.getProviderId() != null) {
            return "providerDto.getProviderId() should be null";
        }

        return null;
    }

    public String validateForUpdateProvider(ProviderDto providerDto) {
        final String error = this.validateMandatory(providerDto);
        if (StringUtils.isNotEmpty(error)) {
            return error;
        }
        if (providerDto.getProviderId() == null) {
            return "providerDto.getProviderId() was null";
        }

        return null;
    }

    private String validateMandatory(ProviderDto providerDto) {
        if (providerDto == null) {
            return "providerDto was null";
        }
        if (StringUtils.isEmpty(providerDto.getName())) {
            return "providerDto.getName() was empty";
        }
        if (StringUtils.isEmpty(providerDto.getAddress())) {
            return "providerDto.getAddress() was empty";
        }
        if (StringUtils.isEmpty(providerDto.getPhone())) {
            return "providerDto.getPhone() was empty";
        }
        if (StringUtils.isEmpty(providerDto.getDescription())) {
            return "providerDto.getDescription() was empty";
        }
        if (StringUtils.isEmpty(providerDto.getGoogleMapsSrc())) {
            return "providerDto.getGoogleMapsSrc() was empty";
        }
        return null;
    }

}