import { GlobalState } from '../../modules/core/global-state';
import { FetchMoviesPlayingNowResponseDto } from './dtos/fetch-movies-playing-now-dto';

export class HomeService {

    static async fetchMoviesPlayingNow(): Promise<FetchMoviesPlayingNowResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchEventsListUrl = '/home/movies-playing-now'

        const response = await apiConsumer.get(fetchEventsListUrl);
        const fetchMoviesPlayingNowResponseDto: FetchMoviesPlayingNowResponseDto | null = FetchMoviesPlayingNowResponseDto.fromObj(response.data)
        if (!fetchMoviesPlayingNowResponseDto) {
            throw new Error('fetchMoviesPlayingNowResponseDto was null');
        }
        return fetchMoviesPlayingNowResponseDto;
    }

}