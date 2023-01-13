export class LabelValue<V extends string | number | boolean> {
    readonly label: string;
    readonly value: V;

    constructor(label: string, value: V) {
        this.label = label;
        this.value = value;
    }

    static fromObj<V extends string | number | boolean>(obj: any): LabelValue<V> {
        return new LabelValue<V>(obj.label, obj.value);
    }
}