import { EventsFilterOptionsDto } from '../../../../modules/event/dtos/events-filter-options-dto';

export class FetchEventsFilterOptionsDto {
    options: EventsFilterOptionsDto | null = null;

    static fromObj(obj: any): FetchEventsFilterOptionsDto | null {
        if (!obj) {
            return null;
        }
        const fetchEventsFilterOptionsDto: FetchEventsFilterOptionsDto = new FetchEventsFilterOptionsDto();
        fetchEventsFilterOptionsDto.options = EventsFilterOptionsDto.fromObj(obj.options);
        return fetchEventsFilterOptionsDto;
    }
}