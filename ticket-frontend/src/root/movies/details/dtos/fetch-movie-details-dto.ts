import { MovieDto } from '../../../../modules/movie/dtos/movie-dto';

export class FetchMovieDetailsResponseDto {
    movie: MovieDto | null = null;

    static fromObj(obj: any): FetchMovieDetailsResponseDto | null {
        if (!obj) {
            return null;
        }
        const fetchMovieDetailsResponseDto: FetchMovieDetailsResponseDto = new FetchMovieDetailsResponseDto();
        fetchMovieDetailsResponseDto.movie = MovieDto.fromObj(obj.movie);
        return fetchMovieDetailsResponseDto;
    }
}
