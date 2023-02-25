import { LabelValue } from '../../core/label-value';
import { TypeUtils } from '../../core/type-utils';
import { MovieListItemDto } from '../../movie/dtos/movie-list-item-dto';
import { TicketDto } from '../../ticket/dtos/ticket-dto';

export class EventDto {
    eventId: number | null;
    name: string;
    eventDatetime: Date | null;
    description: string;
    eventPrice: number;
    movieRef: MovieListItemDto | null;
    hallRef: LabelValue<number> | null;
    tickets: TicketDto[];

    constructor(obj: {
        eventId?: number | null | undefined,
        name: string,
        eventDatetime?: Date | null | undefined,
        description: string,
        eventPrice: number,
        movieRef?: MovieListItemDto | null | undefined,
        hallRef?: LabelValue<number> | null | undefined,
        tickets: TicketDto[],
    }) {
        this.eventId = obj.eventId ? obj.eventId : null;
        this.name = obj.name;
        this.eventDatetime = obj.eventDatetime ? obj.eventDatetime : null;
        this.description = obj.description;
        this.eventPrice = obj.eventPrice;
        this.movieRef = obj.movieRef ? obj.movieRef : null;
        this.hallRef = obj.hallRef ? obj.hallRef : null;
        this.tickets = obj.tickets;
    }

    static fromObj(obj: any): EventDto | null {
        if (!obj) {
            return null;
        }
        const eventDto: EventDto = new EventDto({
            ...obj,
            eventDatetime: obj.eventDatetime ? new Date(obj.eventDatetime) : null,
            movieRef: MovieListItemDto.fromObj(obj.movieRef),
            hallRef: LabelValue.fromObj(obj.hallRef),
            tickets: TicketDto.listFromObjList(obj.tickets),
        });
        return eventDto;
    }

    static listFromObjList(objs: any[]): EventDto[] {
        if (!objs) {
            return [];
        }
        return objs.map(EventDto.fromObj).filter(TypeUtils.isNonNullable);
    }
}