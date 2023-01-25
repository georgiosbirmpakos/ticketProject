import { EventDto } from '../../../../modules/event/dtos/event-dto';

export class FetchEventDetailsResponseDto {
    event: EventDto | null = null;

    static fromObj(obj: any): FetchEventDetailsResponseDto | null {
        if (!obj) {
            return null;
        }
        const fetchEventDetailsResponseDto: FetchEventDetailsResponseDto = new FetchEventDetailsResponseDto();
        fetchEventDetailsResponseDto.event = EventDto.fromObj(obj.event);
        return fetchEventDetailsResponseDto;
    }
}