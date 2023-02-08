import { GlobalState } from '../../../modules/core/global-state';
import { FetchEventsFilterOptionsDto } from './dtos/fetch-events-filter-options-dto';
import { FetchEventsFilteredRequestDto, FetchEventsFilteredResponseDto } from './dtos/fetch-events-filtered-dto';

export class EventsListService {

    static async fetchEventsFilterOptions(): Promise<FetchEventsFilterOptionsDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchEventsListUrl = '/events/filter-options'

        const response = await apiConsumer.get(fetchEventsListUrl);
        const fetchEventsFilterOptionsDto: FetchEventsFilterOptionsDto | null = FetchEventsFilterOptionsDto.fromObj(response.data)
        if (!fetchEventsFilterOptionsDto) {
            throw new Error('fetchEventsFilterOptionsDto was null');
        }
        return fetchEventsFilterOptionsDto;
    }

    static async fetchEventsFiltered(fetchEventsFilteredRequestDto: FetchEventsFilteredRequestDto): Promise<FetchEventsFilteredResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchEventsListUrl = '/events/list-filtered'

        console.log('fetchEventsFilteredRequestDto,', fetchEventsFilteredRequestDto)
        const response = await apiConsumer.get(fetchEventsListUrl, {
            params: {
                ...fetchEventsFilteredRequestDto,
                fromDate: fetchEventsFilteredRequestDto.fromDate ? fetchEventsFilteredRequestDto.fromDate.toISOString() : null,
                toDate: fetchEventsFilteredRequestDto.toDate ? fetchEventsFilteredRequestDto.toDate.toISOString() : null
            }
        });
        const fetchEventsFilteredResponseDto: FetchEventsFilteredResponseDto | null = FetchEventsFilteredResponseDto.fromObj(response.data)
        if (!fetchEventsFilteredResponseDto) {
            throw new Error('fetchEventsFilteredResponseDto was null');
        }
        return fetchEventsFilteredResponseDto;
    }

}