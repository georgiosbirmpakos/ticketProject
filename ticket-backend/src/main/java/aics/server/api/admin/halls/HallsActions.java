package aics.server.api.admin.halls;

import aics.domain.hall.HallService;
import aics.domain.hall.dtos.HallDto;
import aics.domain.hall.dtos.HallListItemDto;
import aics.domain.hall.dtos.HallOptionsDto;
import aics.domain.hall.entities.Hall;
import aics.domain.hall.entities.Seat;
import aics.domain.provider.ProviderService;
import aics.infrastructure.errors.TicketErrorStatus;
import aics.infrastructure.errors.TicketException;
import aics.server.api.admin.halls.dtos.*;
import io.quarkus.logging.Log;
import org.apache.commons.collections4.CollectionUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class HallsActions {
    @Inject
    private HallService hallService;
    @Inject
    private ProviderService providerService;

    @Transactional(rollbackOn = Exception.class)
    public FetchHallsListResponseDto doFetchHallsList() throws TicketException {
        FetchHallsListResponseDto fetchHallsListResponseDto = new FetchHallsListResponseDto();
        Log.info("Start HallsActions.doFetchHallsList");
        List<Hall> halls = this.hallService.fetchAllHalls();
        List<HallListItemDto> hallListItemDtos = CollectionUtils.isNotEmpty(halls) ? halls.stream().map(HallListItemDto::fromHall).toList() : new ArrayList<>();
        fetchHallsListResponseDto.setHalls(hallListItemDtos);
        Log.info("End HallsActions.doFetchHallsList");
        return fetchHallsListResponseDto;
    }

    @Transactional(rollbackOn = Exception.class)
    public FetchHallDetailsResponseDto doFetchHallDetails(Long hallId) throws TicketException {
        FetchHallDetailsResponseDto fetchHallDetailsResponseDto = new FetchHallDetailsResponseDto();
        Log.info("Start HallsActions.doFetchHallDetails");
        Hall hall = this.hallService.fetchHallById(hallId);
        List<Seat> seats = this.hallService.fetchHallSeats(hallId);
        HallDto hallDto = HallDto.fromHall(hall, seats);
        fetchHallDetailsResponseDto.setHall(hallDto);
        Log.info("End HallsActions.doFetchHallDetails");
        return fetchHallDetailsResponseDto;
    }

    @Transactional(rollbackOn = Exception.class)
    public FetchHallsOptionsResponseDto doFetchHallsOptions() throws TicketException {
        FetchHallsOptionsResponseDto fetchHallsOptionsResponseDto = new FetchHallsOptionsResponseDto();
        Log.info("Start HallsActions.doFetchHallsOptions");
        HallOptionsDto hallOptionsDto = this.hallService.fetchHallOptions();
        fetchHallsOptionsResponseDto.setOptions(hallOptionsDto);
        Log.info("End HallsActions.doFetchHallsOptions");
        return fetchHallsOptionsResponseDto;
    }


    @Transactional
    public CreateHallResponseDto doCreateHall(CreateHallRequestDto createHallRequestDto) throws TicketException {
        Log.info("Start HallsActions.doCreateHall");
        CreateHallResponseDto createHallResponseDto = new CreateHallResponseDto();
        if (createHallRequestDto == null) {
            final String errorMsg = "createHallRequestDto was null";
            throw new TicketException(new Exception(errorMsg), errorMsg, TicketErrorStatus.UNPROCESSABLE_ENTITY_422);
        }

        String error = this.hallService.createHall(createHallRequestDto.getHall());
        if (error != null) {
            throw new TicketException(new Exception(error), error, TicketErrorStatus.UNPROCESSABLE_ENTITY_422);
        }

        Log.info("End HallsActions.doCreateHall");
        return createHallResponseDto;
    }

    @Transactional
    public UpdateHallResponseDto doUpdateHall(UpdateHallRequestDto updateHallRequestDto) throws TicketException {
        Log.info("Start HallsActions.doUpdateHall");
        UpdateHallResponseDto updateHallResponseDto = new UpdateHallResponseDto();
        if (updateHallRequestDto == null) {
            final String errorMsg = "updateHallRequestDto was null";
            throw new TicketException(new Exception(errorMsg), errorMsg, TicketErrorStatus.UNPROCESSABLE_ENTITY_422);
        }

        String error = this.hallService.updateHall(updateHallRequestDto.getHall());
        if (error != null) {
            throw new TicketException(new Exception(error), error, TicketErrorStatus.UNPROCESSABLE_ENTITY_422);
        }

        Log.info("End HallsActions.doUpdateHall");
        return updateHallResponseDto;
    }

    @Transactional(rollbackOn = Exception.class)
    public DeleteHallResponseDto doDeleteHall(Long hallId) throws TicketException {
        DeleteHallResponseDto deleteHallResponseDto = new DeleteHallResponseDto();
        Log.info("Start HallsActions.doDeleteHall");
        String error = this.hallService.deleteHallById(hallId);
        if (error != null) {
            throw new TicketException(new Exception(error), error);
        }

        Log.info("End HallsActions.doDeleteHall");
        return deleteHallResponseDto;
    }

}
