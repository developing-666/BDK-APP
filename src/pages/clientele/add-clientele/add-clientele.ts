import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { ClienteleTagPage } from '../clientele-tag/clientele-tag';
import { CustomTagPage } from '../custom-tag/custom-tag';
import { PhoneNumberInputComponent } from '../../../components/phone-number-input/phone-number-input';

import { AppApi } from './../../../providers/app-api';
import { GlobalData } from '../../../providers/global-data';
import { INDUSTRY } from '../../../providers/constants';
import { Utils } from '../../../providers/utils';
@Component({
    selector: 'page-add-clientele',
    templateUrl: 'add-clientele.html'
})
export class AddClientelePage implements OnInit {
    @ViewChild('addClienteleForm') addClienteleForm: NgForm;
    @ViewChild('phonePicker') phonePicker: PhoneNumberInputComponent;
    item: any = this.navParams.get('item');
    callback: any = this.navParams.get('callback');
    type: string = this.navParams.get('type');
    provinces: Array<any> = this.globalData.provinces;
    city: Array<any> = [];
    industry: Array<any> = INDUSTRY;
    formData: any = {
		id:undefined,
        followStatus: undefined,
		phones:[],
        name: undefined,
        post: undefined,
        provinceId: undefined,
        cityId: undefined,
        gender: 'M',
        birthday: undefined,
        company: undefined,
        industry:undefined,
        label: undefined,
        labels: [],
        remark: undefined,
    };
    phones: Array<any> = [];
    valid: boolean = false;
    labelsString: string = '';
    submitIng: boolean = false;
    constructor(
        public toastCtrl: ToastController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public globalData: GlobalData,
        private appApi: AppApi
    ) {
        if (this.type === 'edit') {
			this.labelsString = this.item.labels?this.item.labels.join(','):'';
			if(this.item.phone){
				let phone = this.item.phone;
				let phones = this.item.phones;
				if(phones&&phones.length>0){
					this.phones = [phone,...phones];
				}else{
					this.phones = [phone];
				}
			}
            for (let name in this.formData){
                this.formData[name] = this.item[name];
            }
        }
    }
    ngOnInit() {
        this.queryProvinces();
    }
    ionViewDidLoad() {
        if (this.type === 'edit' && this.item.provinceId) {
            this.queryCitiesByProvinceId();
        }
    }
    add() {
        let phones = this.phonePicker.getPhone();
        if (phones.length != 0) {
			this.valid = true;
            this.formData.phone = phones[0];
			this.formData.phones = [];
			for (let item of phones.slice(1)) {
			    if(item&&item.match(/^1[3|4|5|7|8|9][0-9]{9}$/)){
					this.formData.phones.push(item);
				}
			}
        }
        if (this.addClienteleForm.valid && this.valid) {
            console.log(this.formData);
			if(this.type === 'edit'){
				this.customerUpdate();
			}else{
				this.customerCreate();
			}
        }
    }
    addTag() {
        let callback = (tag): any => {
            console.log(tag);
            this.formData.label = tag;
            return Promise.resolve();
        };
        this.navCtrl.push(ClienteleTagPage, {
            tag: this.formData.label,
            callback
        });
    }
    addCustomTag() {
        let callback = (tags): any => {
            this.formData.labels = tags;
            this.labelsString = tags.join(',');
            return Promise.resolve();
        };
        this.navCtrl.push(CustomTagPage, {
            tag: this.formData.labels,
            callback
        });
    }
    customerCreate() {
        this.submitIng = true;
        this.appApi.customerCreate(this.formData).subscribe(
            d => {
                console.log(d);
                this.presentToast('创建成功');
            },
            e => {
                this.submitIng = false;
            }
        );
    }
	customerUpdate() {
        this.submitIng = true;
        this.appApi.customerUpdate(this.formData).subscribe(
            d => {
                console.log(d);
                this.presentToast('更新成功');
            },
            e => {
                this.submitIng = false;
            }
        );
    }
    presentToast(msg) {
        const toast = this.toastCtrl.create({
            message: msg,
            position: 'middle',
            duration: 1500
        });
        toast.onDidDismiss(() => {
            this.callback(true).then(() => {
                this.navCtrl.pop();
            });
        });
        toast.present();
    }
    queryProvinces() {
        if (this.provinces.length == 0) {
            this.appApi.queryProvinces().subscribe(d => {
                console.log(d);
                this.globalData.provinces = d;
                this.provinces = d;
            });
        }
    }
    queryCitiesByProvinceId() {
        this.appApi
            .queryCitiesByProvinceId(this.formData.provinceId)
            .subscribe(d => {
                console.log(d);
                this.city = d;
            });
    }
}
