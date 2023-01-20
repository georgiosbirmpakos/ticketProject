package aics.domain.hall;

import aics.domain.hall.entities.Seat;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.panache.common.Parameters;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class SeatRepository implements PanacheRepository<Seat> {

    List<Seat> fetchListByHallId(Long hallId) {
        Parameters parameters = Parameters.with("hallId", hallId);
        return find("hall.hallId = :hallId", parameters).list();
    }

    Long deleteByHallId(Long hallId) {
        Parameters parameters = Parameters.with("hallId", hallId);
        return delete("hall.hallId = :hallId", parameters);
    }

}