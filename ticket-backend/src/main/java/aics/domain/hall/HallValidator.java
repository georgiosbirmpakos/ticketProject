package aics.domain.hall;

import aics.domain.hall.dtos.HallDto;
import org.apache.commons.lang3.StringUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class HallValidator {
    @Inject
    private HallRepository hallRepository;

    public String validateForCreateHall(HallDto hallDto) {
        final String error = this.validateMandatory(hallDto);
        if (StringUtils.isNotEmpty(error)) {
            return error;
        }
        if (hallDto.getHallId() != null) {
            return "hallDto.getHallId() should be null";
        }

        return null;
    }

    public String validateForUpdateHall(HallDto hallDto) {
        final String error = this.validateMandatory(hallDto);
        if (StringUtils.isNotEmpty(error)) {
            return error;
        }
        if (hallDto.getHallId() == null) {
            return "hallDto.getHallId() was null";
        }

        return null;
    }

    private String validateMandatory(HallDto hallDto) {
        if (hallDto == null) {
            return "hallDto was null";
        }
        if (StringUtils.isEmpty(hallDto.getName())) {
            return "hallDto.getName() was empty";
        }
        if (StringUtils.isEmpty(hallDto.getDescription())) {
            return "hallDto.getDescription() was empty";
        }
        return null;
    }

}