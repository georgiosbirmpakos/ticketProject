import { GlobalState } from '../../../modules/core/global-state';
import { MovieModel } from '../../shared/models/movie-model';
import { CreateMovieRequestDto, CreateMovieResponseDto } from './dtos/create-movie-dto';
import { DeleteMovieResponseDto } from './dtos/delete-movie-dto';

export class AdminService {

    static async fetchMoviesList(): Promise<MovieModel[]> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchMoviesListUrl = '/admin/movies/list'

        const response = await apiConsumer.get(fetchMoviesListUrl);

        return MovieModel.listFromObjList(response.data);
    }


    static async createMovie(createMovieRequestDto: CreateMovieRequestDto): Promise<CreateMovieResponseDto | null> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchMoviesListUrl = '/admin/movies/new'
        console.log('createMovieRequestDto', createMovieRequestDto)


        const formData = new FormData();
        formData.append('name', createMovieRequestDto.name);
        formData.append('description', createMovieRequestDto.description ? createMovieRequestDto.description : '');
        if (createMovieRequestDto.image) {
            formData.append('image', createMovieRequestDto.image);
        }
        formData.append('directors', createMovieRequestDto.directors);
        formData.append('script', createMovieRequestDto.script);
        formData.append('actors', createMovieRequestDto.actors);
        formData.append('appropriateness', createMovieRequestDto.appropriateness);
        formData.append('duration', '' + createMovieRequestDto.duration);

        const response = await apiConsumer.post(fetchMoviesListUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return CreateMovieResponseDto.fromObj(response.data);
    }

    static async deleteMovie(movieId: number): Promise<DeleteMovieResponseDto | null> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const deleteMovieUrl = '/admin/movies/id/' + movieId;

        const response = await apiConsumer.delete(deleteMovieUrl);

        return CreateMovieResponseDto.fromObj(response.data);
    }
}