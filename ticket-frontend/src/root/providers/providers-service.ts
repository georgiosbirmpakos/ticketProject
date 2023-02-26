import { GlobalState } from '../../modules/core/global-state';
import { FetchProvidersListResponseDto } from './dtos/fetch-providers-list-dto';

export class ProvidersService {

    static async fetchProvidersList(): Promise<FetchProvidersListResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchProvidersListUrl = '/providers/providers-list'

        const response = await apiConsumer.get(fetchProvidersListUrl);
        const fetchProvidersListResponseDto: FetchProvidersListResponseDto | null = FetchProvidersListResponseDto.fromObj(response.data)
        if (!fetchProvidersListResponseDto) {
            throw new Error('fetchProvidersListResponseDto was null');
        }
        return fetchProvidersListResponseDto;
    }

}