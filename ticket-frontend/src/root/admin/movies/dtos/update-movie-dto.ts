import { MovieDto } from '../../../../modules/movie/dtos/movie-dto';

export class UpdateMovieRequestDto {
    movie: MovieDto | null = null;

    static fromObj(obj: any): UpdateMovieRequestDto | null {
        if (!obj) {
            return null;
        }
        const updateMovieRequestDto: UpdateMovieRequestDto = new UpdateMovieRequestDto();
        updateMovieRequestDto.movie = MovieDto.fromObj(obj.movie);
        return updateMovieRequestDto;
    }
}

export class UpdateMovieResponseDto {
    errors: string[] = [];

    static fromObj(obj: any): UpdateMovieResponseDto | null {
        if (!obj) {
            return null;
        }
        const updateMovieResponseDto: UpdateMovieResponseDto = new UpdateMovieResponseDto();
        updateMovieResponseDto.errors = obj.errors;
        return updateMovieResponseDto;
    }
}
