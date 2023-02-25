import { EventDto } from '../../../../modules/event/dtos/event-dto';
import { EventFilters } from '../../../../modules/event/dtos/event-filters';

export class FetchEventsFilteredResponseDto {
    events: EventDto[] = [];

    static fromObj(obj: any): FetchEventsFilteredResponseDto | null {
        if (!obj) {
            return null;
        }
        const fetchEventsFilteredResponseDto: FetchEventsFilteredResponseDto = new FetchEventsFilteredResponseDto();
        fetchEventsFilteredResponseDto.events = EventDto.listFromObjList(obj.events);
        return fetchEventsFilteredResponseDto;
    }
}

export class FetchEventsFilteredRequestDto {
    movieId: number | null;
    providerId: number | null;
    fromDate: Date | null;
    toDate: Date | null;

    constructor(obj: {
        movieId?: number | null,
        providerId?: number | null,
        fromDate?: Date | null,
        toDate?: Date | null
    }) {
        this.movieId = obj.movieId != null ? obj.movieId : null;
        this.providerId = obj.providerId != null ? obj.providerId : null;
        this.fromDate = obj.fromDate ? obj.fromDate : null;
        this.toDate = obj.toDate ? obj.toDate : null;
    }

    static fromObj(obj: any): EventFilters | null {
        if (!obj) {
            return null;
        }
        const eventDto: EventFilters = new EventFilters({
            ...obj,
            fromDate: new Date(obj.fromDate),
            toDate: new Date(obj.toDate)
        });
        return eventDto;
    }

}