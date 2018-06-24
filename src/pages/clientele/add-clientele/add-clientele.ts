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
    provinces: Array<any> = this.globalData.provinces;
    city: Array<any> = [];
    industry: Array<any> = INDUSTRY;
    formData: any = {
        gender: 'M'
    };
    phones: Array<any> = [];
    constructor(
        public toastCtrl: ToastController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public globalData: GlobalData,
        private appApi: AppApi
    ) {}
    ngOnInit() {
        this.queryProvinces();
    }
    ionViewDidLoad() {}
    add() {
        let phone = this.phonePicker.getPhone();
        console.log(this.phones);
        let valid = false;
        if (this.phones.length == 0) {
            if (phone) {
                this.formData.phone = phone;
                valid = true;
            }
            this.formData.phones = null;
        } else {
            valid = true;
            if (phone) {
                this.formData.phone = phone;
                this.formData.phones = this.phones.slice(0);
            } else {
                this.formData.phone = this.phones.slice(0, 1);
                this.formData.phones = this.phones.slice(1);
            }
        }
        console.log(this.formData);
        if (this.addClienteleForm.valid && valid) {
            this.customerCreate();
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
            console.log(tags);
            this.formData.labels = tags;
            return Promise.resolve();
        };
        this.navCtrl.push(CustomTagPage, {
            tag: this.formData.labels,
            callback
        });
    }
    customerCreate() {
        this.appApi.customerCreate(this.formData).subscribe(d => {
            console.log(d);
            this.presentToast();
        });
    }
    presentToast() {
        const toast = this.toastCtrl.create({
            message: '创建成功',
            position: 'middle',
            duration: 2000
        });
        toast.onDidDismiss(() => {
            console.log(666);
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
