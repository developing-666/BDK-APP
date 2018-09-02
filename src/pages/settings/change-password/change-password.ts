import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { Validators } from '../../../providers/validators';
import { AppApi } from './../../../providers/app-api';
import { HttpHeader } from '../../../providers/http-header';
import { LoginPage } from './../../login/login/login';
import { GlobalData } from '../../../providers/global-data';

@IonicPage()
@Component({
    selector: 'page-change-password',
    templateUrl: 'change-password.html'
})
export class ChangePasswordPage {
    ngForm: FormGroup;
    formData: any = {
        oldPassword: '',
        newPassword: ''
    };
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private fb: FormBuilder,
        private appApi: AppApi,
        private toastCtrl: ToastController,
        private storage: Storage,
        private globalData:GlobalData,
		private httpHeader:HttpHeader,
    ) {
        this.createForm();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ChangePasswordPage');
    }

    /**
     * 创建表单
     */

    createForm() {
        this.ngForm = this.fb.group(
            {
                old: ['', [Validators.required, Validators.minLength(6)]],
                new: ['', [Validators.required, Validators.minLength(6)]],
                affirm: ['', [Validators.required, Validators.minLength(6)]]
            },
            { updateOn: 'blur' }
        );
    }
    get old() {
        return this.ngForm.get('old');
    }
    get new() {
        return this.ngForm.get('new');
    }
    get affirm() {
        return this.ngForm.get('affirm');
    }

    /**
     * 提交
     */

    submit() {
        console.log(this.formData);
        this.appApi.resetPassword(this.formData).subscribe(d => {
            console.log(d);
            this.presentToast();
        });
    }

    toForgetPasswordPage() {
        this.navCtrl.push('ForgetPasswordPage');
    }

    presentToast() {
        const toast = this.toastCtrl.create({
            message: '密码修改成功！',
            position: 'middle',
            duration: 1500
        });
        toast.onDidDismiss(() => {
            this.storage.set('token','');
            this.httpHeader.token = '';
            this.globalData.initData();
            this.navCtrl.setRoot(LoginPage);
        });
        toast.present();
    }
}
