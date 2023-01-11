export class LabelValue<V> {
    readonly label: string;
    readonly value: V;

    constructor(label: string, value: V) {
        this.label = label;
        this.value = value;
    }

    fromObj<V>(obj: any) {
        return new LabelValue<V>(obj.label, obj.value);
    }
}