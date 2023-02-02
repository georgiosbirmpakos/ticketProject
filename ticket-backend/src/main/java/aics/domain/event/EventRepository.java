package aics.domain.event;

import aics.domain.event.entities.Event;
import aics.domain.event.models.EventFilters;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.panache.common.Parameters;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class EventRepository implements PanacheRepository<Event> {

    public List<Event> findFiltered(EventFilters eventFilters) {
        Parameters parameters = new Parameters();
        String queryString = "1 = 1";

        if (eventFilters.getFromDate() != null) {
            parameters.and("fromDate", eventFilters.getFromDate());
            queryString += " AND eventDatetime > :fromDate";
        }
        return find(queryString, parameters)
            .list();
    }
}