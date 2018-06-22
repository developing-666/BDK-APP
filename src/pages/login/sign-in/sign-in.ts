import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AppApi } from '../../../providers/app-api';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Validators } from '../../../providers/validators';

@Component({
    selector: 'page-sign-in',
    templateUrl: 'sign-in.html'
})
export class SignInPage {
    ngForm: FormGroup;
    formData: any = {
        validCode: 1234
    };
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private appApi: AppApi,
        private fb: FormBuilder
    ) {
        this.createForm();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SignInPage');
    }

    /**
     * 创建表单
     */
    createForm() {
        this.ngForm = this.fb.group(
            {
                phone: ['', [Validators.required, Validators.phone]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                validCode: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(4),
                        Validators.maxLength(4)
                    ]
                ]
            },
            { updateOn: 'blur' }
        );
    }
    get phone() {
        return this.ngForm.get('phone');
    }
    get password() {
        return this.ngForm.get('password');
    }
    get validCode() {
        return this.ngForm.get('validCode');
    }

    /** 
     * 获取验证码 
     */ 
    getCode() {
        this.appApi.getCode(this.formData.phone).subscribe(d => {
            console.log(d);
        });
    }
    /** 
     * 注册 
     */    
    signIn() {
        console.log(this.formData);
        this.appApi.signIn(this.formData).subscribe(d => {
            console.log(d);
        });
    }
}
