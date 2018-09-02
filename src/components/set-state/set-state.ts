import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { FOLLOWSTATUS } from '../../providers/constants';

@Component({
    selector: 'set-state',
    templateUrl: 'set-state.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SetStateComponent,
            multi: true
        }
    ]
})
export class SetStateComponent implements ControlValueAccessor {
    followStatus: Array<any> = FOLLOWSTATUS;
    changed: any = [];
    touched: any = [];
    disabled: boolean = false;
    innerValue: any = '';
    change = (_: any) => {};
    get value(): any {
        return this.innerValue;
    }
    set value(value: any) {
        if (this.innerValue !== value) {
            this.innerValue = value;
            this.changed.forEach(f => f(value));
        }
    }
    constructor() {}

    statusTap(code) {
        if (code != this.innerValue && !this.disabled) {
            this.value = code;
        }
    }
    // custom-form-item
    registerOnChange(fn: any): void {
        this.change = fn;
        this.changed.push(fn);
    }
    registerOnTouched(fn: any): void {
        this.touched.push(fn);
    }
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
    writeValue(val: string): void {
        if (val) {
            this.value = val;
        } else {
            this.value = this.followStatus[0].value;
            this.change(this.value);
        }
    }
}