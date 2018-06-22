import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppApi } from '../../../providers/app-api';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Validators } from '../../../providers/validators';

@Component({
    selector: 'page-forget-password',
    templateUrl: 'forget-password.html'
})
export class ForgetPasswordPage {
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
        console.log('ionViewDidLoad ForgetPasswordPage');
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
     * 重置密码
     */

    resetPassword() {}

    /** 
     * 获取验证码 
     */ 
    getCode() {
        this.appApi.getCode(this.formData.phone).subscribe(d => {
            console.log(d);
        });
    }
}
