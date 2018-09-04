import {  Component } from '@angular/core';

import { NavController, NavParams, ViewController,Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeService } from '../../../providers/native-service';
import { Helper } from '../../../providers/helper';

import { AppApi } from '../../../providers/app-api';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Validators } from '../../../providers/validators';
import { HttpHeader } from '../../../providers/http-header';

import { HomePage } from '../../home/home';
import { GlobalData } from '../../../providers/global-data';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    ngForm: FormGroup;
    formData: any = {
        phone: 18501667661,
        password: '123456'
    };
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        private appApi: AppApi,
        private fb: FormBuilder,
        private httpHeader: HttpHeader,
        private storage: Storage,
        private globalData: GlobalData,
        private nativeService: NativeService,
        private helper: Helper,
		private events: Events,
    ) {
        this.createForm();
    }
    mushrooms: boolean = true;

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
        this.nativeService.statusBarStyle('#ffffff', true); // 设置状态栏颜色
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
			let data = d.data;
            this.httpHeader.token = data.token;
            this.storage.set('token', data.token);
            this.storage.set('user', data);
            this.globalData.user = data;
            this.globalData.userId = data.jpushAlias;
            this.globalData.userTag = data.jpushTag;
            this.helper.setAlias();
            this.helper.setTags(this.globalData.userTag);
            this.nativeService.statusBarStyle(); // 设置状态栏颜色
            if (this.viewCtrl.isOverlay) {
                this.globalData.modalLoginPage = false;
                // this.events.publish('user:modalLogin'); //  motal登录后刷新数据
                this.navCtrl.setRoot(HomePage);
                // this.viewCtrl.dismiss();
            } else {
                this.navCtrl.setRoot(HomePage); // 重新设置首页
            }
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
        this.navCtrl.push('SignInPage', {
            callback: callback
        });
    }

    /**
     * 跳转用户协议页面
     */
    toUserAgreementPage() {
        this.navCtrl.push('UserAgreementPage');
    }
    /**
     * 跳转忘记密码页面
     */
    toForgetPasswordPage() {
        this.navCtrl.push('ForgetPasswordPage');
    }


    /**
     * 获取企业版信息
     */

    getApplyCompany() {
        this.appApi.applyCompanyQueryInfo().subscribe(d => {
            this.globalData.applyCompanyInfo = d;
        });
    }
}
