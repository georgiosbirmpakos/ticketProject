package aics.domain.hall;

import aics.domain.event.EventRepository;
import aics.domain.hall.dtos.HallDto;
import aics.domain.hall.dtos.HallOptionsDto;
import aics.domain.hall.entities.Hall;
import aics.domain.hall.entities.Seat;
import aics.domain.provider.ProviderRepository;
import aics.domain.provider.ProviderService;
import aics.domain.provider.entities.Provider;
import aics.domain.ticket.TicketRepository;
import aics.infrastructure.core.LabelValue;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.ImmutablePair;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class HallService {
    @Inject
    private HallRepository hallRepository;
    @Inject
    private SeatRepository seatRepository;
    @Inject
    private TicketRepository ticketRepository;
    @Inject
    private EventRepository eventRepository;
    @Inject
    private ProviderRepository providerRepository;
    @Inject
    private HallValidator hallValidator;
    @Inject
    private ProviderService providerService;

    public List<Hall> fetchAllHalls() {
        List<Hall> halls = this.hallRepository.findAll().list();

        return halls;
    }

    public List<Seat> fetchHallSeats(Long hallId) {
        List<Seat> seats = this.seatRepository.fetchListByHallId(hallId);
        return seats;
    }

    public Hall fetchHallById(Long hallId) {
        Hall hall = this.hallRepository.findById(hallId);

        return hall;
    }


    public HallOptionsDto fetchHallOptions() {
        List<Provider> providers = this.providerService.fetchAllProviders();
        List<LabelValue<Long>> providersRefs = CollectionUtils.isNotEmpty(providers)
            ? providers.stream().map((provider -> new LabelValue<Long>(provider.getName(), provider.getProviderId()))).toList()
            : new ArrayList<>();

        return new HallOptionsDto()
            .setProvidersRefs(providersRefs);
    }

    public String createHall(HallDto hallDto) {

        final String error = this.hallValidator.validateForCreateHall(hallDto);
        if (StringUtils.isNotEmpty(error)) {
            return error;
        }

        ImmutablePair<Provider, String> findValidProviderResult = this.findValidProvider(hallDto.getProviderRef());
        if (findValidProviderResult.getRight() != null) {
            return findValidProviderResult.getRight();
        }

        Hall newHall = new Hall()
            .setProvider(findValidProviderResult.getLeft())
            .setName(hallDto.getName())
            .setSeatsRows(hallDto.getSeatsRows())
            .setSeatsColumns(hallDto.getSeatsColumns())
            .setDescription(hallDto.getDescription());

        List<Seat> seats = new ArrayList<>();
        for (int row = 0; row < newHall.getSeatsRows(); row++) {
            for (int column = 0; column < newHall.getSeatsColumns(); column++) {
                Seat newSeat = new Seat()
                    .setHall(newHall)
                    .setSeatRow(row)
                    .setSeatColumn(column);
                seats.add(newSeat);
            }
        }
        this.hallRepository.persist(newHall);
        if (!seats.isEmpty()) {
            this.seatRepository.persist(seats);
        }

        return null;
    }


    public String updateHall(HallDto hallDto) {

        final String error = this.hallValidator.validateForUpdateHall(hallDto);
        if (StringUtils.isNotEmpty(error)) {
            return error;
        }

        Hall hall = this.hallRepository.findById(hallDto.getHallId());
        if (hall == null) {
            return "couldn't find hall";
        }

        hall.setName(hallDto.getName())
            .setDescription(hallDto.getDescription());

        this.hallRepository.persist(hall);

        return null;
    }

    public String deleteHallById(Long hallId) {
        if (hallId == null) {
            return "hallId was null";
        }
        Hall hall = this.hallRepository.findById(hallId);
        if (hall == null) {
            return "couldn't find hall";
        }
        this.seatRepository.deleteByHallId(hall.getHallId());

        this.hallRepository.delete(hall);

        return null;
    }

    private ImmutablePair<Provider, String> findValidProvider(LabelValue<Long> providerRef) {
        if (providerRef == null) {
            return new ImmutablePair<>(null, "providerRef was null");
        }
        if (providerRef.value() == null) {
            return new ImmutablePair<>(null, "providerRef.value was null");
        }
        Provider provider = this.providerRepository.findById(providerRef.value());
        if (provider == null) {
            return new ImmutablePair<>(null, "provider was null");
        }
        return new ImmutablePair<>(provider, null);
    }
}