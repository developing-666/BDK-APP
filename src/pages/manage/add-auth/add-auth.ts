import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams,Events } from 'ionic-angular';

import { AuthTagPage } from '../auth-tag/auth-tag';
import { CustomTagPage } from '../../clientele/custom-tag/custom-tag';

import { AppApi } from '../../../providers/app-api';



@Component({
	selector: 'page-add-auth',
	templateUrl: 'add-auth.html'
})
export class AddAuthPage {
	@ViewChild('addAuthForm') addAuthForm: NgForm;
	type: string = this.navParams.get('type');
	formData: any = {
		phone: undefined,
		name: undefined,
		roleId: undefined,
		labels: undefined,
	};
    role:string = '';
    provinces: Array<any> = [];
    city: Array<any> = [];
    safetyPhones:Array<any> = [];
	submitIng: boolean = false;
	submitted: boolean = false;
	interval: any;
    time: number = 60;
    provinceId:string = '';
    currentPage:number = 1;
	labelsUpdate: any = (d) => {
		console.log(d);
        this.formData.labels = d;
	};
	roleUpdate: any = (d) => {
		console.log(d);
		this.formData.roleId = d.id;
		this.role = d.name;
	};
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appApi: AppApi,
		private events: Events,
	) { }

	ionViewDidLoad() {
        this.queryVirtualPhoneProvinces();
		this.events.subscribe('tag:authTag', this.roleUpdate);
		this.events.subscribe('tag:customTag', this.labelsUpdate);
	}
	ionViewWillUnload() {
		this.events.unsubscribe('tag:authTag', this.roleUpdate);
		this.events.unsubscribe('tag:customTag', this.labelsUpdate);
	}
	authTag() {
		this.navCtrl.push(AuthTagPage, {
            tag: {
				id:this.formData.roleId
			}
        });
	}
	customTag() {
        this.navCtrl.push(CustomTagPage, {
            tag: this.formData.labels
        });
	}
	add() {
		this.submitted = true;
		if (this.addAuthForm.valid) {

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
    queryVirtualPhoneProvinces(){
        this.appApi.queryVirtualPhoneProvinces().subscribe(d => {
            this.provinces = d;
        });
    }
    queryVirtualPhoneCitiesByProvinceId(){
        this.appApi
            .queryVirtualPhoneCitiesByProvinceId(this.provinceId)
            .subscribe(d => {
                this.city = d;
            });
    }
    querySafetyPhones(){
        this.appApi
            .querySafetyPhones({
                currentPageIndex:this.currentPage,
                params:{
                    queryCityId:this.formData.virtualPhoneCityId
                }
            })
            .subscribe(d => {
                this.safetyPhones = d.items;
                this.currentPage ++;
            });
    }
}