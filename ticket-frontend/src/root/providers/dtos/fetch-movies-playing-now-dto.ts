import { MovieListItemDto } from '../../../modules/movie/dtos/movie-list-item-dto';

export class FetchMoviesPlayingNowResponseDto {
    movies: MovieListItemDto[] = [];

    static fromObj(obj: any): FetchMoviesPlayingNowResponseDto | null {
        if (!obj) {
            return null;
        }
        const fetchMoviesPlayingNowResponseDto: FetchMoviesPlayingNowResponseDto = new FetchMoviesPlayingNowResponseDto();
        fetchMoviesPlayingNowResponseDto.movies = MovieListItemDto.listFromObjList(obj.movies);
        return fetchMoviesPlayingNowResponseDto;
    }
}
