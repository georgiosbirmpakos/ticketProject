import { GlobalState } from '../../modules/core/global-state';
import { FetchUserEventsResponseDto } from './dtos/fetch-user-events-dto';

export class AccountService {

    static async fetchUserEvents(): Promise<FetchUserEventsResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchProvidersListUrl = '/account/user-events'

        const response = await apiConsumer.get(fetchProvidersListUrl);
        const fetchUserEventsResponseDto: FetchUserEventsResponseDto | null = FetchUserEventsResponseDto.fromObj(response.data)
        if (!fetchUserEventsResponseDto) {
            throw new Error('fetchUserEventsResponseDto was null');
        }
        return fetchUserEventsResponseDto;
    }

}