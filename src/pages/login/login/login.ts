import { ViewChild, Component } from '@angular/core';

import { App, NavController, NavParams, ViewController } from 'ionic-angular';

import { AppApi } from '../../../providers/app-api';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Validators } from '../../../providers/validators';
import { HttpHeader } from '../../../providers/http-header';

import { AddClientelePage } from '../../clientele/add-clientele/add-clientele';
import { HomePage } from '../../home/home';
import { SignInPage } from '../sign-in/sign-in';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    ngForm: FormGroup;
    formData: any = {
        phone: '18501667661',
        password: '123456'
    };
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        private appApi: AppApi,
        private fb: FormBuilder,
        private app: App,
		private httpHeader:HttpHeader
    ) {
        this.createForm();
    }
    mushrooms: boolean = true;

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }
    /**
     * 创建表单
     */
    createForm() {
        this.ngForm = this.fb.group(
            {
                phone: ['', [Validators.required, Validators.phone]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                agreement: ['', []]
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
    get agreement() {
        return this.ngForm.get('agreement');
    }
    /**
     * 登录
     */

    login() {
        this.appApi.login(this.formData).subscribe(d => {
            console.log(d);
			this.httpHeader.token = d;
            if (this.viewCtrl.isOverlay) {
                this.viewCtrl.dismiss();
            } else {
                this.navCtrl.setRoot(HomePage); // 重新设置首页
            }
            // this.app.getRootNav().push(AddClientelePage);
        });
    }
    /**
     * 注册
     */

    toSigninPage() {
        let callback = (params)=>{
            return new Promise((resolve,reject)=>{

                resolve(()=>{
                    console.log('resolve');

                });
                // reject(()=>{
                //     console.log('reject');

                // });
                if (params) {
                    console.log('拿到参数',params);

                }
            });
        }
        this.navCtrl.push(SignInPage,{
            callback:callback
        });
    }
    /**
     * 测试
     */

    change() {
        console.log(this.ngForm);
        console.log('this.agreement', this.phone);
    }
}
