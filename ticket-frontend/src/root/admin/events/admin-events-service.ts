import { GlobalState } from '../../../modules/core/global-state';
import { CreateEventRequestDto, CreateEventResponseDto } from './dtos/create-event-dto';
import { DeleteEventResponseDto } from './dtos/delete-event-dto';
import { FetchEventDetailsResponseDto } from './dtos/fetch-event-details-dto';
import { FetchEventOptionsResponseDto } from './dtos/fetch-event-options-dto';
import { FetchEventsListResponseDto } from './dtos/fetch-events-list-dto';
import { UpdateEventRequestDto, UpdateEventResponseDto } from './dtos/update-event-dto';


export class AdminEventsService {

    static async fetchEventsList(): Promise<FetchEventsListResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchEventsListUrl = '/admin/events/list'

        const response = await apiConsumer.get(fetchEventsListUrl);
        const fetchProvidersListResponseDto: FetchEventsListResponseDto | null = FetchEventsListResponseDto.fromObj(response.data)
        if (!fetchProvidersListResponseDto) {
            throw new Error('fetchProvidersListResponseDto was null');
        }
        return fetchProvidersListResponseDto;
    }

    static async fetchEventDetails(eventId: number): Promise<FetchEventDetailsResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchEventDetailsUrl = '/admin/events/details/' + eventId;

        const response = await apiConsumer.get(fetchEventDetailsUrl);
        const fetchEventDetailsResponseDto: FetchEventDetailsResponseDto | null = FetchEventDetailsResponseDto.fromObj(response.data)
        if (!fetchEventDetailsResponseDto) {
            throw new Error('fetchEventDetailsResponseDto was null');
        }
        return fetchEventDetailsResponseDto;
    }

    static async fetchEventOptions(): Promise<FetchEventOptionsResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchEventOptionsUrl = '/admin/events/options';

        const response = await apiConsumer.get(fetchEventOptionsUrl);
        const fetchEventOptionsResponseDto: FetchEventOptionsResponseDto | null = FetchEventOptionsResponseDto.fromObj(response.data)
        if (!fetchEventOptionsResponseDto) {
            throw new Error('fetchEventsOptionsResponseDto was null');
        }
        return fetchEventOptionsResponseDto;
    }

    static async createEvent(createEventRequestDto: CreateEventRequestDto): Promise<CreateEventResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const createProviderUrl = '/admin/events/new'

        const response = await apiConsumer.post(createProviderUrl, createEventRequestDto);
        const createEventResponseDto: CreateEventResponseDto | null = CreateEventResponseDto.fromObj(response.data)
        if (!createEventResponseDto) {
            throw new Error('createEventResponseDto was null');
        }
        return createEventResponseDto;
    }

    static async updateEvent(updateEventRequestDto: UpdateEventRequestDto): Promise<UpdateEventResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const updateEventUrl = '/admin/events/update'

        const response = await apiConsumer.put(updateEventUrl, updateEventRequestDto);
        const updateEventResponseDto: UpdateEventResponseDto | null = UpdateEventResponseDto.fromObj(response.data)
        if (!updateEventResponseDto) {
            throw new Error('updateEventResponseDto was null');
        }
        return updateEventResponseDto;
    }

    static async deleteEvent(eventId: number | null): Promise<DeleteEventResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const deleteEventUrl = '/admin/events/id/' + eventId;

        const response = await apiConsumer.delete(deleteEventUrl);
        const deleteEventResponseDto: DeleteEventResponseDto | null = DeleteEventResponseDto.fromObj(response.data)
        if (!deleteEventResponseDto) {
            throw new Error('deleteEventResponseDto was null');
        }
        return deleteEventResponseDto;
    }

}