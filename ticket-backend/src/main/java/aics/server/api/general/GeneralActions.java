package aics.server.api.general;

import aics.infrastructure.auth.AuthService;
import aics.infrastructure.auth.LoggedUserDetails;
import aics.infrastructure.errors.TicketException;
import aics.server.api.general.dtos.FetchLoggedUserDetailsDto;
import io.quarkus.logging.Log;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;

@ApplicationScoped
public class GeneralActions {
    @Inject
    AuthService authService;

    @Transactional()
    public FetchLoggedUserDetailsDto doFetchLoggedUserDetails() throws TicketException {
        Log.info("Start GeneralActions.doFetchLoggedUserDetails");
        FetchLoggedUserDetailsDto fetchProvidersListResponseDto = new FetchLoggedUserDetailsDto();
        LoggedUserDetails loggedUserDetails = this.authService.getLoggedUserDetails();
        fetchProvidersListResponseDto.setLoggedUserDetails(loggedUserDetails);
        Log.info("End GeneralActions.doFetchLoggedUserDetails");
        return fetchProvidersListResponseDto;
    }

}