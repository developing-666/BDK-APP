import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AppApi } from '../../../providers/app-api';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Validators } from '../../../providers/validators';
import { NativeService } from '../../../providers/native-service';

@IonicPage()
@Component({
	selector: 'page-forget-password',
	templateUrl: 'forget-password.html'
})
export class ForgetPasswordPage {
	ngForm: FormGroup;
	formData: any = {};
	showVerificationCode: boolean = true; //显示验证码按钮
	time: number = 60; //倒计时
	interval: any; //setInterval
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appApi: AppApi,
		private fb: FormBuilder,
		private toastCtrl: ToastController,
		private nativeService: NativeService,
	) {
		this.createForm();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ForgetPasswordPage');
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
				newPassword: ['', [Validators.required, Validators.minLength(6)]],
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
	get newPassword() {
		return this.ngForm.get('newPassword');
	}
	get validCode() {
		return this.ngForm.get('validCode');
	}

    /**
     * 重置密码
     */
	resetPassword() {
		this.appApi.forgetPassword(this.formData).subscribe(d => {
			console.log(d);
			this.presentToast();
		});
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

	presentToast() {
		const toast = this.toastCtrl.create({
			message: '密码重置成功',
			position: 'middle',
			duration: 1500
		});
		toast.onDidDismiss(() => {
			this.navCtrl.pop();
		});
		toast.present();
	}
}
