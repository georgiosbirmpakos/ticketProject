import { LabelValue } from '../core/label-value';
import { TypeUtils } from '../core/type-utils';

export class HallOptionsDto {
    providersRefs: LabelValue<number>[] = [];

    static fromObj(obj: any): HallOptionsDto | null {
        if (!obj) {
            return null;
        }
        const hallDto: HallOptionsDto = new HallOptionsDto();
        hallDto.providersRefs = LabelValue.listFromObjList(obj.providersRefs);
        return hallDto;
    }

    static listFromObjList(objs: any[]): HallOptionsDto[] {
        if (!objs) {
            return [];
        }
        return objs.map(HallOptionsDto.fromObj).filter(TypeUtils.isNonNullable);
    }
}