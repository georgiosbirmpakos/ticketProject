import { EventDto } from '../../../../modules/event/dtos/event-dto';

export class FetchEventsListResponseDto {
    events: EventDto[] = [];

    static fromObj(obj: any): FetchEventsListResponseDto | null {
        if (!obj) {
            return null;
        }
        const fetchHallsListResponseDto: FetchEventsListResponseDto = new FetchEventsListResponseDto();
        fetchHallsListResponseDto.events = EventDto.listFromObjList(obj.events);
        return fetchHallsListResponseDto;
    }
}