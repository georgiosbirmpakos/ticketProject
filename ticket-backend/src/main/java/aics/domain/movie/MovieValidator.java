package aics.domain.movie;

import aics.domain.movie.dtos.MovieDto;
import aics.domain.provider.ProviderRepository;
import org.apache.commons.lang3.StringUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class MovieValidator {
    @Inject
    private ProviderRepository providerRepository;

    public String validateForCreateMovie(MovieDto movieDto) {
        final String error = this.validateMandatory(movieDto);
        if (StringUtils.isNotEmpty(error)) {
            return error;
        }
        if (movieDto.getMovieId() != null) {
            return "movieDto.getMovieId() should be null";
        }

        return null;
    }

    public String validateForUpdateMovie(MovieDto movieDto) {
        final String error = this.validateMandatory(movieDto);
        if (StringUtils.isNotEmpty(error)) {
            return error;
        }
        if (movieDto.getMovieId() == null) {
            return "movieDto.getMovieId() was null";
        }

        return null;
    }

    private String validateMandatory(MovieDto movieDto) {
        if (movieDto == null) {
            return "movieModel was null";
        }
        if (StringUtils.isEmpty(movieDto.getName())) {
            return "movieModel.getName() was empty";
        }
        if (StringUtils.isEmpty(movieDto.getImage())) {
            return "movieModel.getImage() was empty";
        }
        if (StringUtils.isEmpty(movieDto.getImageName())) {
            return "movieModel.getImageName() was empty";
        }
        if (StringUtils.isEmpty(movieDto.getImageMimePrefix())) {
            return "movieModel.getImageMimePrefix() was empty";
        }
        if (StringUtils.isEmpty(movieDto.getImageName())) {
            return "movieModel.getImageName() was empty";
        }
        if (StringUtils.isEmpty(movieDto.getDirectors())) {
            return "movieModel.getDirectors() was empty";
        }
        if (StringUtils.isEmpty(movieDto.getScript())) {
            return "movieModel.getScript() was empty";
        }
        if (StringUtils.isEmpty(movieDto.getActors())) {
            return "movieModel.getActors() was empty";
        }
        if (StringUtils.isEmpty(movieDto.getAppropriateness())) {
            return "movieModel.getAppropriateness() was empty";
        }
        if (movieDto.getDuration() <= 0) {
            return "movieModel.getDuration() was not positive";
        }
        if (StringUtils.isEmpty(movieDto.getTrailerSrcUrl())) {
            return "movieModel.getTrailerSrcUrl() was empty";
        }
        return null;
    }

}