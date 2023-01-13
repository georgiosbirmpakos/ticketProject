package aics.domain.hall;

import aics.domain.hall.entities.Seat;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class SeatRepository implements PanacheRepository<Seat> {

    List<Seat> fetchListByHallId(Long hallId) {
        Map<String, Long> parameters = new HashMap<>();
        parameters.put("hallId", hallId);
        return find("hall = hallId", parameters).list();
    }
    Long deleteByHallId(Long hallId) {
        Map<String, Long> parameters = new HashMap<>();
        parameters.put("hallId", hallId);
        return delete("hall = hallId", parameters);
    }

}