import { MovieListItemDto } from '../../../../modules/movie/dtos/movie-list-item-dto';

export class FetchMoviesListResponseDto {
    movies: MovieListItemDto[] = [];

    static fromObj(obj: any): FetchMoviesListResponseDto | null {
        if (!obj) {
            return null;
        }
        const fetchMoviesListResponseDto: FetchMoviesListResponseDto = new FetchMoviesListResponseDto();
        fetchMoviesListResponseDto.movies = MovieListItemDto.listFromObjList(obj.movies);
        return fetchMoviesListResponseDto;
    }
}
