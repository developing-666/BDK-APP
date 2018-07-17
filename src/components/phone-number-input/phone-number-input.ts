import { Component, ViewChild,Input, OnChanges,SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


import { NativeService } from '../../providers/native-service';
import { AppApi } from '../../providers/app-api';
import { Utils } from '../../providers/utils';

@Component({
    selector: 'phone-number-input',
    templateUrl: 'phone-number-input.html',
})
export class PhoneNumberInputComponent implements OnChanges{
    @ViewChild('phoneForm') phoneForm: NgForm;
	@Input() phones :Array<string> = [];
    phoneError: boolean = false;
    addEd: boolean = false;
    changed: any = [];
    touched: any = [];
    disabled: boolean = false;
    innerValue: Array<any> = [];
    valid:boolean = false;
	inputs:Array<any> = [''];
	phonesNums:Array<any> = [];
	values:Array<string> = [];
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
    constructor(
        private appApi: AppApi,
		public nativeService: NativeService,
    ) {}
	ngOnChanges(changes: SimpleChanges){
		if(changes.phones.currentValue&&changes.phones.currentValue.length>0){
			this.phonesNums = Utils.extend(true,[],changes.phones.currentValue);
		}
	}
    input(e){
        if (this.phoneForm.valid) {
            this.appApi.customerValid(e.target.value).subscribe(d => {
				// for (let phone of this.phonesNums) {
				//    if(this.value.indexOf(phone)==-1){
				// 	   this.value.push(phone);
				//    }
				// }
            });
        }
    }
	add() {
		console.log(this.value);
        this.addEd = true;
        if (this.phoneForm.valid) {
			if(this.phones.length!=0){
				let tmp = true;
				for (let phone of this.values) {
				    if(this.phones.indexOf(phone)>-1){
						tmp = false;
						this.nativeService.alert('电话号码重复,请检查');
					}
				}
				if(tmp){
					this.inputs.length ++;
					this.values.length ++;
					this.addEd = false;
				}
			}else{
				this.inputs.length ++;
				this.values.length ++;
				this.addEd = false;
			}
        }
    }
    getPhone():any{
        this.addEd = true;
		console.log(this.values);
        if (this.phoneForm.valid) {
            this.addEd = false;
			if(this.phones.length>0){
				return Array.from(new Set([...this.values,...this.phones]));
			}else{
				return this.values;
			}
        }else{
			if(this.phones.length>0){
				return this.phones;
			}else{
				return [];
			}
		}
    }
    delete(i){
		this.phones.splice(i,1);
		this.phonesNums.splice(i,1);
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
