import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Validators } from '../../../providers/validators';
import { AppApi } from './../../../providers/app-api';
import { ForgetPasswordPage } from '../../login/forget-password/forget-password';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
        private toastCtrl: ToastController
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
        this.navCtrl.push(ForgetPasswordPage);
    }

    presentToast() {
        const toast = this.toastCtrl.create({
            message: '密码修改成功！',
            position: 'middle',
            duration: 1500
        });
        toast.onDidDismiss(() => {
            this.navCtrl.pop();
        });
        toast.present();
    }
}
