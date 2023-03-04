package aics.domain.event;

import aics.domain.event.entities.Event;
import aics.domain.event.models.EventFilters;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.panache.common.Parameters;

import javax.enterprise.context.ApplicationScoped;
import java.time.LocalDateTime;
import java.util.List;

@ApplicationScoped
public class EventRepository implements PanacheRepository<Event> {

    public List<Event> findFiltered(EventFilters eventFilters) {
        Parameters parameters = new Parameters();
        String queryString = "1 = 1";
        if (eventFilters.getMovieId() != null) {
            parameters.and("movieId", eventFilters.getMovieId());
            queryString += " AND (movie.movieId = :movieId)";
        }
        if (eventFilters.getProviderId() != null) {
            parameters.and("providerId", eventFilters.getProviderId());
            queryString += " AND (hall.provider.providerId = :providerId)";
        }
        if (eventFilters.getFromDate() != null) {
            parameters.and("fromDate", eventFilters.getFromDate());
            queryString += " AND (eventDatetime >= :fromDate)";
        }
        if (eventFilters.getToDate() != null) {
            parameters.and("toDate", eventFilters.getToDate());
            queryString += " AND (eventDatetime <= :toDate)";
        }
        return find(queryString, parameters)
            .list();
    }

    public List<Event> findCurrent() {
        Parameters parameters = new Parameters();
        parameters.and("fromDate", LocalDateTime.now());

        String queryString = "eventDatetime >= :fromDate";

        return find(queryString, parameters)
            .list();
    }

    public Long deleteByHallId(Long hallId) {
        Parameters parameters = Parameters.with("hallId", hallId);
        return delete("hall.hallId = :hallId", parameters);
    }
}