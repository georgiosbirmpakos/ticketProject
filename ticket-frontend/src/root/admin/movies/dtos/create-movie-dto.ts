import { MovieDto } from '../../../../modules/movie/dtos/movie-dto';

export class CreateMovieRequestDto {
    movie: MovieDto | null = null;

    static fromObj(obj: any): CreateMovieRequestDto | null {
        if (!obj) {
            return null;
        }
        const createMovieRequestDto: CreateMovieRequestDto = new CreateMovieRequestDto();
        createMovieRequestDto.movie = MovieDto.fromObj(obj.movie);
        return createMovieRequestDto;
    }

}

export class CreateMovieResponseDto {
    errors: string[] = [];

    static fromObj(obj: any): CreateMovieResponseDto | null {
        if (!obj) {
            return null;
        }
        const createMovieResponseDto: CreateMovieResponseDto = new CreateMovieResponseDto();
        createMovieResponseDto.errors = obj.errors;
        return createMovieResponseDto;
    }
}
