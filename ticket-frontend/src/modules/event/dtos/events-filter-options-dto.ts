import { LabelValue } from '../../core/label-value';
import { TypeUtils } from '../../core/type-utils';

export class EventsFilterOptionsDto {
    moviesRefs: LabelValue<number>[] = [];
    providersRefs: LabelValue<number>[] = [];

    static fromObj(obj: any): EventsFilterOptionsDto | null {
        if (!obj) {
            return null;
        }
        const eventOptionsDto: EventsFilterOptionsDto = new EventsFilterOptionsDto();
        eventOptionsDto.moviesRefs = LabelValue.listFromObjList(obj.moviesRefs);
        eventOptionsDto.providersRefs = LabelValue.listFromObjList(obj.providersRefs);
        return eventOptionsDto;
    }

    static listFromObjList(objs: any[]): EventsFilterOptionsDto[] {
        if (!objs) {
            return [];
        }
        return objs.map(EventsFilterOptionsDto.fromObj).filter(TypeUtils.isNonNullable);
    }
}