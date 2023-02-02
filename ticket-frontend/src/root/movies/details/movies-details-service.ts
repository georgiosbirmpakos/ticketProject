import { GlobalState } from '../../../modules/core/global-state';
import { FetchMovieDetailsResponseDto } from './dtos/fetch-movie-details-dto';

export class MoviesDetailsService {

    static async fetchMovieDetails(movieId: number): Promise<FetchMovieDetailsResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchMoviesListUrl = '/movies/details/' + movieId;

        const response = await apiConsumer.get(fetchMoviesListUrl);
        const fetchMovieDetailsResponseDto: FetchMovieDetailsResponseDto | null = FetchMovieDetailsResponseDto.fromObj(response.data)
        if (!fetchMovieDetailsResponseDto) {
            throw new Error('fetchMovieDetailsResponseDto was null');
        }
        return fetchMovieDetailsResponseDto;
    }
}