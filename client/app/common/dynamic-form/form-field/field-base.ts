export class FieldBase<T> {
    value: T;
    key: string;
    id: string;
    label: string;
    controlType: string;
    placeholder: string;
    validators: Array<T>;

    constructor(options: {
        value?: T,
        key?: string,
        id?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string,
        placeholder?: string,
        formControlName?: string;
        validators?: Array<T>;
    } = {}) {
        this.value = options.value,
        this.key = options.key || '';
        this.id = options.id || '';
        this.label = options.label || '';
        this.controlType = options.controlType || '';
        this.placeholder = options.placeholder || '';
        this.formControlName = options.formControlName || '';
        this.validators = options.validators || [];
    }
}
