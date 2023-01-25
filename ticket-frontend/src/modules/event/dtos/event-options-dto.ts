import { LabelValue } from '../../core/label-value';
import { TypeUtils } from '../../core/type-utils';

export class EventOptionsDto {
    moviesRefs: LabelValue<number>[] = [];
    hallsRefs: LabelValue<number>[] = [];

    static fromObj(obj: any): EventOptionsDto | null {
        if (!obj) {
            return null;
        }
        const eventOptionsDto: EventOptionsDto = new EventOptionsDto();
        eventOptionsDto.moviesRefs = LabelValue.listFromObjList(obj.moviesRefs);
        eventOptionsDto.hallsRefs = LabelValue.listFromObjList(obj.hallsRefs);
        return eventOptionsDto;
    }

    static listFromObjList(objs: any[]): EventOptionsDto[] {
        if (!objs) {
            return [];
        }
        return objs.map(EventOptionsDto.fromObj).filter(TypeUtils.isNonNullable);
    }
}