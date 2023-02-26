import { GlobalState } from '../../../modules/core/global-state';
import { BookTicketRequestDto, BookTicketResponseDto } from './dtos/book-ticket-dto';
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

    static async bookTicket(bookTicketRequestDto: BookTicketRequestDto): Promise<BookTicketResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const bookTicketUrl = '/events/book-ticket';

        const response = await apiConsumer.post(bookTicketUrl, bookTicketRequestDto);
        const bookTicketResponseDto: BookTicketResponseDto | null = BookTicketResponseDto.fromObj(response.data)
        if (!bookTicketResponseDto) {
            throw new Error('bookTicketResponseDto was null');
        }
        return bookTicketResponseDto;
    }
}