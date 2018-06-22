import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AppApi } from '../../../providers/app-api';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Validators } from '../../../providers/validators';
import { GlobalData } from '../../../providers/global-data';
import { Utils } from '../../../providers/utils';

@Component({
    selector: 'page-sign-in',
    templateUrl: 'sign-in.html'
})
export class SignInPage {
    ngForm: FormGroup;
    formData: any = {
        phone: '18611112222',
        validCode: 1234
    };
    showVerificationCode: boolean = true; //显示验证码按钮
    time: number = 60; //倒计时
    interval: any; //setInterval
    canRegister: boolean = false; //手机号可以注册
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private appApi: AppApi,
        private fb: FormBuilder,
        private globalData: GlobalData
    ) {
        this.createForm();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SignInPage');
    }

    ionViewWillLeave() {
        this.countDownEnd();
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
            this.showVerificationCode = false;
            this.interval = setInterval(() => {
                console.log(this.time);
                this.time > 0 ? this.time-- : this.countDownEnd();
            }, 1000);
        });
    }
    /**
     * 倒计时结束
     */

    countDownEnd() {
        clearInterval(this.interval);
        this.showVerificationCode = true;
        this.time = 60;
    }

    /**
     * 注册
     */
    signIn() {
        console.log(this.formData);
        this.appApi.signIn(this.formData).subscribe(d => {
            console.log('signIn', d);
        });
    }
    /**
     * 验证手机号
     */
    signInPhoneValid() {
        if (this.phone.valid) {
            this.appApi
                .signInPhoneValid({
                    phone: this.formData.phone
                })
                .subscribe(d => {
                    console.log(d);
                    this.canRegister = true;
                });
        }
    }

    /**
     * 测试
     */

    change() {
        console.log(this.ngForm);
        console.log('this.phone', this.phone);
    }
}
