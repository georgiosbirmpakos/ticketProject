import { GlobalState } from '../../../modules/core/global-state';
import { FetchEventDetailsResponseDto } from './dtos/fetch-event-details-dto';

export class EventsDetailsService {

    static async fetchEventDetails(eventId: number): Promise<FetchEventDetailsResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchEventDetailsUrl = '/events/details/' + eventId;

        const response = await apiConsumer.get(fetchEventDetailsUrl);
        const fetchEventDetailsResponseDto: FetchEventDetailsResponseDto | null = FetchEventDetailsResponseDto.fromObj(response.data)
        if (!fetchEventDetailsResponseDto) {
            throw new Error('fetchEventDetailsResponseDto was null');
        }
        return fetchEventDetailsResponseDto;
    }
}