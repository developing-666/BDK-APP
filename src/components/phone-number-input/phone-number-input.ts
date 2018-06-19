import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'phone-number-input',
    templateUrl: 'phone-number-input.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: PhoneNumberInputComponent,
            multi: true
        }
    ]
})
export class PhoneNumberInputComponent implements ControlValueAccessor {
    @ViewChild('phoneForm') phoneForm: NgForm;
    phoneError: boolean = false;
    addEd: boolean = false;
    changed: any = [];
    touched: any = [];
    disabled: boolean = false;
    innerValue: Array<any> = [];
    phone: number = null;
    onChange = (_: any) => {};
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
    change(val) {
        // this.onChange(val);
    }
    add() {
        this.addEd = true;
        if (this.phoneForm.valid) {
            this.value.push(this.phone);
            this.onChange(this.value);
            this.phone = null;
            this.addEd = false;
            this.phoneForm.reset();
        }
    }
    delete(i){
        this.value.splice(i,1);
        this.onChange(this.value);
    }  
    // custom-form-item
    registerOnChange(fn: any): void {
        this.onChange = fn;
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
        }
    }
}
