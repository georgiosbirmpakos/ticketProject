import { LabelValue } from '../../core/label-value';
import { TypeUtils } from '../../core/type-utils';

export class TicketDto {
    ticketId: number | null = null;
    dateOfBooking: Date | null = null;
    description: string = '';
    eventRef: LabelValue<number> | null = null;
    seatRef: LabelValue<number> | null = null;
    seatRow: number = 0;
    seatColumn: number = 0;
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
        ticketDto.seatRef = LabelValue.fromObj(obj.seatRef);
        ticketDto.seatRow = obj.seatRow;
        ticketDto.seatColumn = obj.seatColumn;
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