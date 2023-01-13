import { TypeUtils } from '../core/type-utils';

export class SeatListItemDto {
    seatId: number = 0;
    seatRow: number = 0;
    seatColumn: number = 0;
    description: string = '';

    static fromObj(obj: any): SeatListItemDto | null {
        if (!obj) {
            return null;
        }
        const seatListItemDto: SeatListItemDto = new SeatListItemDto();
        seatListItemDto.seatId = obj.seatId;
        seatListItemDto.seatRow = obj.seatRow;
        seatListItemDto.seatColumn = obj.seatColumn;
        seatListItemDto.description = obj.description;
        return seatListItemDto;
    }

    static listFromObjList(objs: any[]): SeatListItemDto[] {
        if (!objs) {
            return [];
        }
        return objs.map(SeatListItemDto.fromObj).filter(TypeUtils.isNonNullable);
    }
}