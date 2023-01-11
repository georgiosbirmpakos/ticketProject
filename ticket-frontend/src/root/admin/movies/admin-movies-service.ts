import { GlobalState } from '../../../modules/core/global-state';
import { MovieDto } from '../../../modules/movie/movie-dto';
import { CreateMovieRequestDto, CreateMovieResponseDto } from './dtos/create-movie-dto';
import { DeleteMovieResponseDto } from './dtos/delete-movie-dto';
import { FetchMovieDetailsResponseDto } from './dtos/fetch-movie-details-dto';
import { FetchMoviesListResponseDto } from './dtos/fetch-movies-list-dto';

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
        const fetchMoviesListUrl = '/admin/movies/list'

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
        console.log('createMovieRequestDto', createMovieRequestDto)


        // const formData = new FormData();
        // formData.append('name', createMovieRequestDto.name);
        // formData.append('description', createMovieRequestDto.description ? createMovieRequestDto.description : '');
        // if (createMovieRequestDto.image) {
        //     formData.append('image', createMovieRequestDto.image);
        // }
        // formData.append('directors', createMovieRequestDto.directors);
        // formData.append('script', createMovieRequestDto.script);
        // formData.append('actors', createMovieRequestDto.actors);
        // formData.append('appropriateness', createMovieRequestDto.appropriateness);
        // formData.append('duration', '' + createMovieRequestDto.duration);

        // const response = await apiConsumer.post(fetchMoviesListUrl, formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // });

        const response = await apiConsumer.post(fetchMoviesListUrl, createMovieRequestDto);

        return CreateMovieResponseDto.fromObj(response.data);
    }

    static async deleteMovie(movieId: number | null): Promise<DeleteMovieResponseDto | null> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const deleteMovieUrl = '/admin/movies/id/' + movieId;

        const response = await apiConsumer.delete(deleteMovieUrl);

        return CreateMovieResponseDto.fromObj(response.data);
    }
}