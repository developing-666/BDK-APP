import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams,
	ToastController,
	ActionSheetController,
	AlertController
} from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Validators } from '../../../providers/validators';
import { AppApi } from './../../../providers/app-api';
import { GlobalData } from '../../../providers/global-data';
import { INDUSTRY } from '../../../providers/constants';
import { NativeService } from '../../../providers/native-service';

@IonicPage()
@Component({
	selector: 'page-user-info',
	templateUrl: 'user-info.html'
})
export class UserInfoPage {
	ngForm: FormGroup;
	canEdit: boolean = false;
	formData: any = {
		avatar: this.globalData.user.avatar,
		name: undefined,
		phone: undefined,
		post: undefined,
		provinceId: undefined,
		cityId: undefined,
		gender: undefined,
		birthday: undefined,
		company: undefined,
		industry: undefined,
	};
	initFormData: any = {
		avatar: this.globalData.user.avatar,
		name: undefined,
		phone: undefined,
		post: undefined,
		provinceId: undefined,
		cityId: undefined,
		gender: undefined,
		birthday: undefined,
		company: undefined,
		industry: undefined,
	};
	provinces: Array<any> = this.globalData.provinces;
	city: Array<any> = [];
	industrys: Array<any> = INDUSTRY;
	callback: any = this.navParams.get('callback');
	private _userInfo: any;
	public get userInfo(): any {
		return this._userInfo;
	}
	public set userInfo(value: any) {
		this._userInfo = value;
		console.log('userInfo value', value);

		if (value != null && value != {}) {

			for (const name in this.formData) {
				if (value[name] != null) {
					this.formData[name] = value[name];
					this.initFormData[name] = value[name];
				}
			}
			if (this.formData.avatar.indexOf('base64') > -1) {
				this.appApi.upoadImage({
					data: this.formData.avatar,
					type: 'USER_AVATAR'
				}).subscribe(d => {
					this.formData.avatar = d.url;
					this.initFormData.avatar = d.url;
					console.log('avatar======', this.formData.avatar);
				});
			}
		}
	}
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private fb: FormBuilder,
		public globalData: GlobalData,
		private appApi: AppApi,
		private toastCtrl: ToastController,
		private actionSheetCtrl: ActionSheetController,
		private nativeService: NativeService,
		public alertCtrl: AlertController
	) {
		this.createForm();
		this.initData();
	}

	ionViewDidLoad() {
		this.queryProvinces();
	}
	ionViewCanLeave() {
		if (JSON.stringify(this.initFormData) == JSON.stringify(this.formData)) {
			return true;
		} else {
			return this.confirm();
		}
	}
	initData() {
		this.userInfo = this.globalData.user;
	}
    /**
     * 创建表单
     */
	createForm() {
		this.ngForm = this.fb.group(
			{
				name: ['', [Validators.required, Validators.maxLength(15)]],
				phone: ['', [Validators.phone, Validators.required]],
				post: ['', [Validators.maxLength(15)]],
				provinceId: [''],
				cityId: [''],
				gender: [''],
				birthday: [''],
				company: ['', [Validators.maxLength(30)]],
				industry: ['']
			},
			{ updateOn: 'blur' }
		);
	}
	get name() {
		return this.ngForm.get('name');
	}
	get phone() {
		return this.ngForm.get('phone');
	}
	get post() {
		return this.ngForm.get('post');
	}
	get provinceId() {
		return this.ngForm.get('provinceId');
	}
	get cityId() {
		return this.ngForm.get('cityId');
	}
	get gender() {
		return this.ngForm.get('gender');
	}
	get birthday() {
		return this.ngForm.get('birthday');
	}
	get company() {
		return this.ngForm.get('company');
	}
	get industry() {
		return this.ngForm.get('industry');
	}

	change() {
		console.log(this.ngForm);
	}

    /**
     * 获取省份
     */
	queryProvinces() {
		if (this.provinces.length == 0) {
			this.appApi.queryProvinces().subscribe(d => {
				console.log(d);
				this.globalData.provinces = d;
				this.provinces = d;
			});
		}
	}

    /**
     * 根据省份获取城市
     */
	queryCitiesByProvinceId() {
		if (this.formData.provinceId == null || this.formData.provinceId == '') {
			return;
		}
		this.appApi
			.queryCitiesByProvinceId(this.formData.provinceId)
			.subscribe(d => {
				console.log(d);
				this.city = d;
			});
	}

    /**
     * 获取用户信息
     */

	queryUserInfo() {
		this.appApi.queryUserInfo().subscribe(d => {
			console.log('queryUserInfo', d);
		});
	}

    /**
     * 更新用户信息
     */
	updateUserInfo(r: any = undefined) {
		let param = this.formData;
		if (param.avatar.indexOf('base64') > -1) {
			param.avatar = null;
		}
		console.log('updateUserInfo-param', param);
		this.appApi.updateUserInfo(param).subscribe(d => {
			console.log('updateUserInfo', d);
			this.canEdit = false;
			for (const name in this.formData) {
				this.globalData.user[name] = this.formData[name];
			}
			this.callback(this.formData).then();
			if (r) {
				r(true);
			}
		}, e => {
			if (r) {
				r(true);
			}
		});
	}

    /**
     * 点击编辑按钮
     */
	clickEditButton() {
		console.log('this.ngForm.valid', this.ngForm.valid);
		if (this.canEdit) {
			if (this.ngForm.valid) {
				this.updateUserInfo();
			} else {
				console.log(this.ngForm);

				this.presentToast('请正确填写信息');
			}
		} else {
			this.canEdit = true;
		}
	}

	toChangePasswordPage() {
		this.navCtrl.push('ChangePasswordPage');
	}

	presentToast(msg) {
		const toast = this.toastCtrl.create({
			message: msg,
			position: 'middle',
			duration: 1500
		});
		toast.present();
	}

	presentActionSheet() {
		const self = this;
		const actionSheet = this.actionSheetCtrl.create({
			buttons: [
				{
					text: '拍照',
					handler: () => {
						self.nativeService
							.getPictureByCamera({
								targetWidth: 800,
								targetHeight: 800
							})
							.subscribe(imageUrl => {
								// 获取成功
								console.log('拍照 获取成功', imageUrl);

								this.appApi.upoadImage({
									data: imageUrl,
									type: 'USER_AVATAR'
								}).subscribe(d => {
									this.formData.avatar = d.url;
									this.initFormData.avatar = d.url;
									console.log('avatar======', this.formData.avatar);
								});
							});
					}
				},
				{
					text: '从相册获取',
					handler: () => {
						console.log('从相册获取');
						this.nativeService
							.getPictureByPhotoLibrary({
								targetWidth: 800,
								targetHeight: 800
							})
							.subscribe(imageUrl => {
								// 获取成功
								console.log('相册 获取成功', imageUrl);
								console.log('avatar======', this.formData.avatar);
								this.appApi.upoadImage({
									data: imageUrl,
									type: 'USER_AVATAR'
								}).subscribe(d => {
									this.formData.avatar = d.url;
									this.initFormData.avatar = d.url;
									console.log('avatar======', this.formData.avatar);
								});

							});
					}
				},
				{
					text: '取消',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});
		actionSheet.present();
	}
	confirm(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			let alert = this.alertCtrl.create({
				title: '是否保存本次编辑结果',
				buttons: [
					{
						text: '不保存',
						role: 'cancel',
						handler: () => {
							resolve(true);
						}
					},
					{
						text: '保存',
						handler: () => {
							this.updateUserInfo(resolve);
						}
					}
				]
			});
			alert.present();
		});
	}
}
