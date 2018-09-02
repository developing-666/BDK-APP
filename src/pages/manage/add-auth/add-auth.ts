import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';

import { AppApi } from '../../../providers/app-api';


@IonicPage()
@Component({
	selector: 'page-add-auth',
	templateUrl: 'add-auth.html'
})
export class AddAuthPage {
	@ViewChild('addAuthForm') addAuthForm: NgForm;
	type: string = this.navParams.get('type');
	item: any = this.navParams.get('item');
	formData: any = {
		code: undefined,
		phone: undefined,
		name: undefined,
		roleId: undefined,
		labels: undefined,
		virtualPhoneCityId: undefined,
		virtualPhoneId: undefined,
	};
	role: string = '';
	provinces: Array<any> = [];
	city: Array<any> = [];
	safetyPhones: Array<any> = [];
	submitIng: boolean = false;
	submitted: boolean = false;
	interval: any;
	time: number = 60;
	provinceId: string = '';
	virtualPhone: string = undefined;
	isHasNext: boolean = false;
	currentPage: number = 1;
	bindSafetyPhone: boolean = false;
	labelsUpdate: any = (d) => {
		console.log(d);
		this.formData.labels = d;
	};
	roleUpdate: any = (d) => {
		console.log(d);
		this.formData.roleId = d.id;
		this.role = d.name;
	};
	phoneNum: any = (d) => {
		this.formData.virtualPhoneId = d.id;
		this.virtualPhone = d.phone;
	}
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appApi: AppApi,
		private events: Events,
		private modalCtrl: ModalController
	) { }

	ionViewDidLoad() {
		this.queryVirtualPhoneProvinces();
		this.events.subscribe('tag:authTag', this.roleUpdate);
		this.events.subscribe('tag:customTag', this.labelsUpdate);
		this.events.subscribe('pickPhone', this.phoneNum);
		if (this.type == 'edit') {
			this.virtualPhone = this.item.virtualPhone;
			for (let name in this.formData) {
				console.log(name);
				this.formData[name] = this.item[name];
			}
			this.formData.roleId = this.item.role.id;
			this.role = this.item.role.name;
		}
	}
	ionViewWillUnload() {
		this.events.unsubscribe('tag:authTag', this.roleUpdate);
		this.events.unsubscribe('tag:customTag', this.labelsUpdate);
		this.events.unsubscribe('pickPhone', this.phoneNum);
	}
	authTag() {
		this.navCtrl.push('AuthTagPage', {
			tag: {
				id: this.formData.roleId
			}
		});
	}
	customTag() {
		this.navCtrl.push('CustomTagPage', {
			tag: this.formData.labels
		});
	}
	add() {
		this.submitted = true;
		if (this.addAuthForm.valid) {
			if (this.type == 'edit') {
				this.formData.id = this.item.id;
				this.appApi.updateByCompany(this.formData).subscribe(d => {
					this.events.publish('auth:update');
					this.navCtrl.pop();
				});
			} else {
				this.appApi.createByCompany(this.formData).subscribe(d => {
					this.events.publish('auth:create');
					this.navCtrl.pop();
				});
			}
		}
	}
	getCode() {
		this.appApi.getCode(this.formData.phone).subscribe(d => {
			this.interval = setInterval(() => {
				this.time > 0 ? this.time-- : this.countDownEnd();
			}, 1000);
		});
	}
	countDownEnd() {
		clearInterval(this.interval);
		this.time = 60;
	}
	queryVirtualPhoneProvinces() {
		this.appApi.queryVirtualPhoneProvinces().subscribe(d => {
			this.provinces = d;
		});
	}
	queryVirtualPhoneCitiesByProvinceId() {
		this.appApi
			.queryVirtualPhoneCitiesByProvinceId(this.provinceId)
			.subscribe(d => {
				this.city = d;
			});
	}
	pickPhone() {
		if (this.type == 'edit') return;
		let profileModal = this.modalCtrl.create('PickPhonePage', {
			cityId: this.formData.virtualPhoneCityId,
			phone: this.formData.virtualPhoneId ? {
				id: this.formData.virtualPhoneId,
				phone: this.virtualPhone
			} : undefined
		});
		profileModal.present();
	}
	getPhone(id) {
		console.log(id);
		for (let item of this.safetyPhones) {
			if (item.value == id) {
				this.virtualPhone = item.label;
			}
		};
	}
}
