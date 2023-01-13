package aics.domain.hall;

import aics.domain.hall.dtos.HallDto;
import aics.domain.hall.entities.Hall;
import aics.domain.hall.entities.Seat;
import aics.domain.provider.entities.Provider;
import org.apache.commons.lang3.StringUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class HallService {
    @Inject
    HallRepository hallRepository;
    @Inject
    SeatRepository seatRepository;
    @Inject
    HallValidator hallValidator;

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

    public String createHall(HallDto hallDto) {

        final String error = this.hallValidator.validateForCreateHall(hallDto);
        if (StringUtils.isNotEmpty(error)) {
            return error;
        }

        Hall newHall = new Hall()
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

        hall.setHallId(hallDto.getHallId())
            .setName(hallDto.getName())
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
        Long deleted = this.seatRepository.deleteByHallId(hall.getHallId());

        this.hallRepository.delete(hall);

        return null;
    }
}