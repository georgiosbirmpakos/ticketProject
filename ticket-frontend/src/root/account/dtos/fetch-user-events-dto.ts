import { EventDto } from '../../../modules/event/dtos/event-dto';

export class FetchUserEventsResponseDto {
    events: EventDto[] = [];

    static fromObj(obj: any): FetchUserEventsResponseDto | null {
        if (!obj) {
            return null;
        }
        const fetchUserEventsResponseDto: FetchUserEventsResponseDto = new FetchUserEventsResponseDto();
        fetchUserEventsResponseDto.events = EventDto.listFromObjList(obj.events);
        return fetchUserEventsResponseDto;
    }
}
