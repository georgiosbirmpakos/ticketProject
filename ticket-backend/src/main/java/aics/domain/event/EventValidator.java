package aics.domain.event;

import aics.domain.event.dtos.EventDto;
import org.apache.commons.lang3.StringUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class EventValidator {
    @Inject
    private EventRepository eventRepository;

    public String validateForCreateEvent(EventDto eventDto) {
        final String error = this.validateMandatory(eventDto);
        if (StringUtils.isNotEmpty(error)) {
            return error;
        }
        if (eventDto.getEventId() != null) {
            return "eventDto.getEventId() should be null";
        }

        return null;
    }

    public String validateForUpdateEvent(EventDto eventDto) {
        final String error = this.validateMandatory(eventDto);
        if (StringUtils.isNotEmpty(error)) {
            return error;
        }
        if (eventDto.getEventId() == null) {
            return "eventDto.getEventId() was null";
        }

        return null;
    }

    private String validateMandatory(EventDto eventDto) {
        if (eventDto == null) {
            return "eventDto was null";
        }
        if (StringUtils.isEmpty(eventDto.getName())) {
            return "eventDto.getName() was empty";
        }
//        if (StringUtils.isEmpty(eventDto.getDescription())) {
//            return "eventDto.getDescription() was empty";
//        }
        return null;
    }

}