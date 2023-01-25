import { LabelValue } from '../../core/label-value';
import { TypeUtils } from '../../core/type-utils';
import { TicketDto } from '../../ticket/dtos/ticket-dto';

export class EventDto {
    eventId: number | null = null;
    name: string | null = null;
    eventDatetime: Date | null = null;
    description: string | null = null;
    eventPrice: number | null = null;
    movieRef: LabelValue<number> | null = null;
    hallRef: LabelValue<number> | null = null;
    tickets: TicketDto[] = [];

    static fromObj(obj: any): EventDto | null {
        if (!obj) {
            return null;
        }
        const eventDto: EventDto = new EventDto();
        eventDto.eventId = obj.eventId;
        eventDto.name = obj.name;
        eventDto.eventDatetime = obj.ventDatetime ? new Date(obj.eventDatetime) : null;
        eventDto.description = obj.description;
        eventDto.eventPrice = obj.eventPrice;
        eventDto.movieRef = LabelValue.fromObj(obj.movieRef);
        eventDto.hallRef = LabelValue.fromObj(obj.hallRef);
        eventDto.tickets = TicketDto.listFromObjList(obj.tickets);
        return eventDto;
    }

    static listFromObjList(objs: any[]): EventDto[] {
        if (!objs) {
            return [];
        }
        return objs.map(EventDto.fromObj).filter(TypeUtils.isNonNullable);
    }
}