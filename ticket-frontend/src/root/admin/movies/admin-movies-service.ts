import { GlobalState } from '../../../modules/core/global-state';
import { CreateMovieRequestDto, CreateMovieResponseDto } from './dtos/create-movie-dto';
import { DeleteMovieResponseDto } from './dtos/delete-movie-dto';
import { FetchMovieDetailsResponseDto } from './dtos/fetch-movie-details-dto';
import { FetchMoviesListResponseDto } from './dtos/fetch-movies-list-dto';
import { UpdateMovieRequestDto, UpdateMovieResponseDto } from './dtos/update-movie-dto';

export class AdminMoviesService {

    static async fetchMoviesList(): Promise<FetchMoviesListResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchMoviesListUrl = '/admin/movies/list'

        const response = await apiConsumer.get(fetchMoviesListUrl);
        const fetchMoviesListResponseDto: FetchMoviesListResponseDto | null = FetchMoviesListResponseDto.fromObj(response.data)
        if (!fetchMoviesListResponseDto) {
            throw new Error('fetchMoviesListResponseDto was null');
        }
        return fetchMoviesListResponseDto;
    }


    static async fetchMovieDetails(movieId: number): Promise<FetchMovieDetailsResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchMoviesListUrl = '/admin/movies/details/' + movieId;

        const response = await apiConsumer.get(fetchMoviesListUrl);
        const fetchMovieDetailsResponseDto: FetchMovieDetailsResponseDto | null = FetchMovieDetailsResponseDto.fromObj(response.data)
        if (!fetchMovieDetailsResponseDto) {
            throw new Error('fetchMovieDetailsResponseDto was null');
        }
        return fetchMovieDetailsResponseDto;
    }


    static async createMovie(createMovieRequestDto: CreateMovieRequestDto): Promise<CreateMovieResponseDto | null> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchMoviesListUrl = '/admin/movies/new'
        const response = await apiConsumer.post(fetchMoviesListUrl, createMovieRequestDto);
        return CreateMovieResponseDto.fromObj(response.data);
    }


    static async updateMovie(updateMovieRequestDto: UpdateMovieRequestDto): Promise<UpdateMovieResponseDto | null> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchMoviesListUrl = '/admin/movies/update';
        const response = await apiConsumer.put(fetchMoviesListUrl, updateMovieRequestDto);
        return UpdateMovieResponseDto.fromObj(response.data);
    }

    static async deleteMovie(movieId: number | null): Promise<DeleteMovieResponseDto | null> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const deleteMovieUrl = '/admin/movies/id/' + movieId;
        const response = await apiConsumer.delete(deleteMovieUrl);
        return CreateMovieResponseDto.fromObj(response.data);
    }
}