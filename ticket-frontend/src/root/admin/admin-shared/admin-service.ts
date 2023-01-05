import { GlobalState } from '../../../modules/core/global-state';

export class AdminService {

    static async fetchMoviesList() {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchMoviesListUrl = '/admin/movies/list'

        const response = await apiConsumer.get(fetchMoviesListUrl);

        return response.data;
    }
}