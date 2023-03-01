package aics.server.api.providers;

import aics.domain.provider.ProviderService;
import aics.domain.provider.dtos.ProviderDto;
import aics.domain.provider.entities.Provider;
import aics.infrastructure.errors.TicketException;
import aics.server.api.providers.dtos.FetchProvidersListResponseDto;
import io.quarkus.logging.Log;
import org.apache.commons.collections4.CollectionUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class ProvidersActions {
    @Inject
    private ProviderService providerService;

    @Transactional(rollbackOn = Exception.class)
    public FetchProvidersListResponseDto doFetchProvidersList() throws TicketException {
        Log.info("Start ProvidersActions.doFetchProvidersList");
        FetchProvidersListResponseDto fetchProvidersListResponseDto = new FetchProvidersListResponseDto();
        List<Provider> providers = this.providerService.fetchAllProviders();
        List<ProviderDto> providersDtos = CollectionUtils.isNotEmpty(providers)
            ? providers.stream().map(ProviderDto::fromProvider).toList()
            : new ArrayList<>();

        fetchProvidersListResponseDto.setProviders(providersDtos);
        Log.info("End ProvidersActions.doFetchProvidersList");
        return fetchProvidersListResponseDto;
    }
}