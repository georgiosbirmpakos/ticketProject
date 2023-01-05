import { GlobalState } from '../../../modules/core/global-state';
import { MovieModel } from '../../shared/models/movie-model';

export class AdminService {

    static async fetchMoviesList(): Promise<MovieModel[]> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchMoviesListUrl = '/admin/movies/list'

        const response = await apiConsumer.get(fetchMoviesListUrl);

        return MovieModel.listFromObjList(response.data);
    }
}