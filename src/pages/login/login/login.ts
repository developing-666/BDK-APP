import { ViewChild, Component } from '@angular/core';

import { App, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeService } from '../../../providers/native-service';

import { AppApi } from '../../../providers/app-api';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Validators } from '../../../providers/validators';
import { HttpHeader } from '../../../providers/http-header';

import { AddClientelePage } from '../../clientele/add-clientele/add-clientele';
import { HomePage } from '../../home/home';
import { SignInPage } from '../sign-in/sign-in';
import { GlobalData } from '../../../providers/global-data';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    ngForm: FormGroup;
    formData: any = {
        phone: '18501667661',
        password: '123123'
    };
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        private appApi: AppApi,
        private fb: FormBuilder,
        private app: App,
		private httpHeader:HttpHeader,
        private storage: Storage,
        private globalData:GlobalData,
        private nativeService: NativeService,
    ) {
        this.createForm();
    }
    mushrooms: boolean = true;

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
		this.nativeService.statusBarStyle('#ffffff',true); // 设置状态栏颜色
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
            this.storage.set('token',d);
			this.nativeService.statusBarStyle(); // 设置状态栏颜色
            if (this.viewCtrl.isOverlay) {
                this.globalData.modalLoginPage = false;
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
        let callback = params => {
            return new Promise((resolve, reject) => {
                if (params) {
                    this.formData.phone = params.phone;
                    resolve();
                }
            });
        };
        this.navCtrl.push(SignInPage, {
            callback: callback
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
