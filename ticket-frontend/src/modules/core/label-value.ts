import { TypeUtils } from './type-utils';

export class LabelValue<V extends string | number | boolean> {
    readonly label: string;
    readonly value: V;

    constructor(label: string, value: V) {
        this.label = label;
        this.value = value;
    }

    static fromObj<V extends string | number | boolean>(obj: any): LabelValue<V> | null {
        if (!obj) {
            return null;
        }
        return new LabelValue<V>(obj.label, obj.value);
    }

    static listFromObjList<V extends string | number | boolean>(objs: any[]): LabelValue<V>[] {
        if (!objs) {
            return [];
        }
        return objs.map((obj) => LabelValue.fromObj<V>(obj)).filter(TypeUtils.isNonNullable);
    }
}