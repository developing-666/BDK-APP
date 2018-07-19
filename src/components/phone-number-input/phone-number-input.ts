import {
    Component,
    ViewChild,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { NativeService } from '../../providers/native-service';
import { AppApi } from '../../providers/app-api';
import { Utils } from '../../providers/utils';

@Component({
    selector: 'phone-number-input',
    templateUrl: 'phone-number-input.html'
})
export class PhoneNumberInputComponent implements OnChanges {
    @ViewChild('phoneForm') phoneForm: NgForm;
    @Input() phones: Array<string> = [];
    phoneError: boolean = false;
    addEd: boolean = false;
    changed: any = [];
    touched: any = [];
    disabled: boolean = false;
    innerValue: Array<any> = [];
    valid: Array<boolean> = [];
    inputs: Array<any> = [];
    values: Array<string> = [];
    phonesNums: Array<any> = [];
    // phones:Array<any> = [];
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
    constructor(private appApi: AppApi, public nativeService: NativeService) {}
    ngOnChanges(changes: SimpleChanges) {
        console.log();
        if (
            changes.phones.currentValue &&
            changes.phones.currentValue.length > 0
        ) {
            this.inputs.length = changes.phones.currentValue.length;
            for (let i = 0; i < this.inputs.length; i++) {
                this.valid.push(true);
            }
            this.values = Utils.extend(true, [], changes.phones.currentValue);
        }
    }
    input(e) {
        if (this.phoneForm.valid) {
            this.appApi.customerValid(e.target.value).subscribe(d => {
                console.log(d);
                if (d.code !== 0) {
                    this.nativeService.showToast({
                        message: d.message,
                        cssClass: 'danger'
                    });
                } else {
                    this.valid[e.target.dataset.index] = true;
                }
            });
        }
    }
    add() {
        console.log(this.value);
        this.addEd = true;
        if (
            this.inputs.length < 3 &&
            this.phoneForm.valid &&
            (this.valid.length === 0 || this.valid[this.values.length - 1])
        ) {
            this.inputs.length++;
            this.values.length++;
            this.valid.length++;
            this.addEd = false;
        }
    }
    getPhone(): any {
        this.addEd = true;
        console.log(this.values);
        if (Array.from(new Set(this.values)).length != this.values.length) {
            this.nativeService.alert('电话号码重复');
            return [];
        } else {
            if (this.phoneForm.valid) {
                return this.values;
            } else {
                return [];
            }
        }
    }
    delete(i) {
        this.inputs.splice(i, 1);
        this.values.splice(i, 1);
        this.valid.splice(i, 1);
    }
    // custom-form-item
    // registerOnChange(fn: any): void {
    //     this.onChange = fn;
    //     this.changed.push(fn);
    // }
    // registerOnTouched(fn: any): void {
    //     this.touched.push(fn);
    // }
    // setDisabledState(isDisabled: boolean): void {
    //     this.disabled = isDisabled;
    // }
    // writeValue(val: any): void {
    //     if (val) {
    //         this.value = val;
    // 		this.phones = val;
    //     }
    // }
}
