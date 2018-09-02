import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AppApi } from '../../../providers/app-api';
import { FormBuilder, FormGroup } from '@angular/forms';

import { NativeService } from '../../../providers/native-service';
import { Validators } from '../../../providers/validators';

@IonicPage()
@Component({
	selector: 'page-sign-in',
	templateUrl: 'sign-in.html'
})
export class SignInPage {
	ngForm: FormGroup;
	formData: any = {
		phone: '',
		validCode: ''
	};
	showVerificationCode: boolean = true; //显示验证码按钮
	time: number = 60; //倒计时
	interval: any; //setInterval
	canRegister: boolean = false; //手机号可以注册
	showRegisterResult: boolean = false; //显示 验证手机号提示文字
	registerResult: string = '';//验证手机号提示文字
	callback = this.navParams.get('callback');
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appApi: AppApi,
		private fb: FormBuilder,
		public toastController: ToastController,
		private nativeService: NativeService,
	) {
		this.createForm();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SignInPage');
		this.nativeService.statusBarStyle(); // 设置状态栏颜色
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
			this.registerSuccess();
		});
	}


    /**
     * 手机号码改变时
     */
	phoneChange() {
		this.showRegisterResult = false;
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
				.subscribe(res => {
					console.log(res);
					this.showRegisterResult = true;
					if (res.code == 0) {
						this.canRegister = true;
					} else {
						this.registerResult = res.message;
					}
				});
		}
	}

    /**
     * 提示
     */
	async registerSuccess() {
		const toast = await this.toastController.create({
			message: '注册成功！',
			showCloseButton: true,
			position: 'top',
			duration: 1500,
			cssClass: 'success'
		});
		toast.present();
		toast.onDidDismiss(() => {
			console.log('dissmiss后执行');
			this.callback({
				phone: this.formData.phone
			}).then(() => {
				this.navCtrl.pop();
			});

		});
	}

    /**
     * 测试
     */

	change() {
		console.log(this.ngForm);
		console.log('this.phone', this.phone);
		this.registerSuccess();
	}
}
