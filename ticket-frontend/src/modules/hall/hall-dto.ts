import { LabelValue } from '../core/label-value';
import { TypeUtils } from '../core/type-utils';
import { SeatListItemDto } from './seat-list-item-dto';

export class HallDto {
    hallId: number | null = null;
    name: string = '';
    seatsRows: number = 0;
    seatsColumns: number = 0;
    description: string = '';
    seats: SeatListItemDto[] = [];
    providerRef: LabelValue<number> | null = null;

    static fromObj(obj: any): HallDto | null {
        if (!obj) {
            return null;
        }
        const hallDto: HallDto = new HallDto();
        hallDto.hallId = obj.hallId;
        hallDto.name = obj.name;
        hallDto.seatsRows = obj.seatsRows;
        hallDto.seatsColumns = obj.seatsColumns;
        hallDto.description = obj.description;
        hallDto.seats = SeatListItemDto.listFromObjList(obj.seats);
        hallDto.providerRef = LabelValue.fromObj(obj.providerRef);
        return hallDto;
    }

    static listFromObjList(objs: any[]): HallDto[] {
        if (!objs) {
            return [];
        }
        return objs.map(HallDto.fromObj).filter(TypeUtils.isNonNullable);
    }
}