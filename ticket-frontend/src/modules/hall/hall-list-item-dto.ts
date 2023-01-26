import { LabelValue } from '../core/label-value';
import { TypeUtils } from '../core/type-utils';

export class HallListItemDto {
    hallId: number = 0;
    name: string = '';
    seatsRows: number = 0;
    seatsColumns: number = 0;
    description: string = '';
    providerRef: LabelValue<number> | null = null;

    static fromObj(obj: any): HallListItemDto | null {
        if (!obj) {
            return null;
        }
        const providerDto: HallListItemDto = new HallListItemDto();
        providerDto.hallId = obj.hallId;
        providerDto.name = obj.name;
        providerDto.seatsRows = obj.seatsRows;
        providerDto.seatsColumns = obj.seatsColumns;
        providerDto.description = obj.description;
        providerDto.providerRef = LabelValue.fromObj(obj.providerRef);
        return providerDto;
    }

    static listFromObjList(objs: any[]): HallListItemDto[] {
        if (!objs) {
            return [];
        }
        return objs.map(HallListItemDto.fromObj).filter(TypeUtils.isNonNullable);
    }
}