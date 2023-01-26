import { LabelValue } from '../../core/label-value';
import { TypeUtils } from '../../core/type-utils';

export class TicketDto {
    ticketId: number | null = null;
    dateOfBooking: Date | null = null;
    description: string = '';
    eventRef: LabelValue<number> | null = null;
    eatRef: LabelValue<number> | null = null;
    userRef: LabelValue<number> | null = null;

    static fromObj(obj: any): TicketDto | null {
        if (!obj) {
            return null;
        }
        const ticketDto: TicketDto = new TicketDto();
        ticketDto.ticketId = obj.ticketId;
        ticketDto.dateOfBooking = obj.dateOfBooking ? new Date(obj.dateOfBooking) : null;
        ticketDto.description = obj.description;
        ticketDto.eventRef = LabelValue.fromObj(obj.eventRef);
        ticketDto.eatRef = LabelValue.fromObj(obj.eatRef);
        ticketDto.userRef = LabelValue.fromObj(obj.userRef);
        return ticketDto;
    }

    static listFromObjList(objs: any[]): TicketDto[] {
        if (!objs) {
            return [];
        }
        return objs.filter(TypeUtils.isNonNullable).map(TicketDto.fromObj).filter(TypeUtils.isNonNullable);
    }
}