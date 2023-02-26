package aics.server.api.admin.providers;

import aics.domain.provider.ProviderService;
import aics.domain.provider.dtos.ProviderDto;
import aics.domain.provider.dtos.ProviderListItemDto;
import aics.domain.provider.entities.Provider;
import aics.infrastructure.errors.TicketErrorStatus;
import aics.infrastructure.errors.TicketException;
import aics.server.api.admin.providers.dtos.*;
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
        FetchProvidersListResponseDto fetchProvidersListResponseDto = new FetchProvidersListResponseDto();
        Log.info("Start ProvidersActions.doFetchProvidersList");
        List<Provider> providers = this.providerService.fetchAllProviders();
        List<ProviderListItemDto> providerListItemDtos = CollectionUtils.isNotEmpty(providers) ? providers.stream().map(ProviderListItemDto::fromProvider).toList() : new ArrayList<>();
        fetchProvidersListResponseDto.setProviders(providerListItemDtos);
        Log.info("End ProvidersActions.doFetchProvidersList");
        return fetchProvidersListResponseDto;
    }

    @Transactional(rollbackOn = Exception.class)
    public FetchProviderDetailsResponseDto doFetchProvidersDetails(Long providerId) throws TicketException {
        FetchProviderDetailsResponseDto fetchProviderDetailsResponseDto = new FetchProviderDetailsResponseDto();
        Log.info("Start ProvidersActions.doFetchProvidersList");
        Provider provider = this.providerService.fetchProviderById(providerId);
        ProviderDto providerDto = ProviderDto.fromProvider(provider);
        fetchProviderDetailsResponseDto.setProvider(providerDto);
        Log.info("End ProvidersActions.doFetchProvidersList");
        return fetchProviderDetailsResponseDto;
    }

    @Transactional
    public CreateProviderResponseDto doCreateProvider(CreateProviderRequestDto createProviderRequestDto) throws TicketException {
        Log.info("Start ProvidersActions.doCreateProvider");
        CreateProviderResponseDto createProviderResponseDto = new CreateProviderResponseDto();
        if (createProviderRequestDto == null) {
            final String errorMsg = "createProviderRequestDto was null";
            throw new TicketException(new Exception(errorMsg), errorMsg, TicketErrorStatus.UNPROCESSABLE_ENTITY_422);
        }

        String error = this.providerService.createProvider(createProviderRequestDto.getProvider());
        if (error != null) {
            throw new TicketException(new Exception(error), error, TicketErrorStatus.UNPROCESSABLE_ENTITY_422);
        }

        Log.info("End ProvidersActions.doCreateProvider");
        return createProviderResponseDto;
    }

    @Transactional
    public UpdateProviderResponseDto doUpdateProvider(UpdateProviderRequestDto updateProviderRequestDto) throws TicketException {
        Log.info("Start ProvidersActions.doUpdateProvider");
        UpdateProviderResponseDto updateProviderResponseDto = new UpdateProviderResponseDto();
        if (updateProviderRequestDto == null) {
            final String errorMsg = "updateProviderRequestDto was null";
            throw new TicketException(new Exception(errorMsg), errorMsg, TicketErrorStatus.UNPROCESSABLE_ENTITY_422);
        }

        String error = this.providerService.updateProvider(updateProviderRequestDto.getProvider());
        if (error != null) {
            throw new TicketException(new Exception(error), error, TicketErrorStatus.UNPROCESSABLE_ENTITY_422);
        }

        Log.info("End ProvidersActions.doUpdateProvider");
        return updateProviderResponseDto;
    }

    @Transactional(rollbackOn = Exception.class)
    public DeleteProviderResponseDto doDeleteProvider(Long providerId) throws TicketException {
        DeleteProviderResponseDto deleteProviderResponseDto = new DeleteProviderResponseDto();
        Log.info("Start ProvidersActions.doDeleteProvider");
        String error = this.providerService.deleteProviderById(providerId);
        if (error != null) {
            throw new TicketException(new Exception(error), error);
        }

        Log.info("End ProvidersActions.doDeleteProvider");
        return deleteProviderResponseDto;
    }

}