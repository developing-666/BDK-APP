import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
    IonicPage,
    NavController,
    NavParams,
    ToastController,
    AlertController,
    Events
} from 'ionic-angular';

import { PhoneNumberInputComponent } from '../../../components/phone-number-input/phone-number-input';

import { AppApi } from '../../../providers/app-api';
import { GlobalData } from '../../../providers/global-data';
import { NativeService } from '../../../providers/native-service';
import { Utils } from './../../../providers/utils';
import { INDUSTRY } from '../../../providers/constants';
@IonicPage()
@Component({
    selector: 'page-add-clientele',
    templateUrl: 'add-clientele.html'
})
export class AddClientelePage implements OnInit {
    @ViewChild('addClienteleForm')
    addClienteleForm: NgForm;
    @ViewChild('phonePicker')
    phonePicker: PhoneNumberInputComponent;
    customerId: string = this.navParams.get('customerId');
    item: any = this.navParams.get('item');
    type: string = this.navParams.get('type');
    provinces: Array<any> = this.globalData.provinces;
    city: Array<any> = [];
    industry: Array<any> = INDUSTRY;
    tmpFormData: any;
    formData: any = {
        id: undefined,
        followStatus: undefined,
        phones: [],
        name: undefined,
        post: undefined,
        provinceId: undefined,
        cityId: undefined,
        email: undefined,
        qq: undefined,
        wechat: undefined,
        gender: 'M',
        birthday: undefined,
        company: undefined,
        industry: undefined,
        label: undefined,
        labels: [],
        remark: undefined
    };
    phones: Array<any> = [];
    valid: boolean = false;
    labelsString: string = '';
    submitIng: boolean = false;
    person: any;
    update: any = d => {
        console.log(d);
        this.person = d;
        this.formData.name = d.displayName;
        if (!d.phoneNumber) return;
        let phones: Array<string> = [];
        for (let item of d.phoneNumber) {
            phones.push(item.value.replace(/-/g, ''));
        }
        this.phones = phones;
        console.log(this.phones);
    };
    clienteleTag: any = d => {
        this.formData.label = d;
    };
    customTag: any = d => {
        this.formData.labels = d;
        this.labelsString = d.join(',');
    };
    constructor(
        public toastCtrl: ToastController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public globalData: GlobalData,
        public nativeService: NativeService,
        private appApi: AppApi,
        public events: Events,
        public alertCtrl: AlertController
    ) {}
    ionViewDidLoad() {
        this.events.subscribe('contacts:choose', this.update);
        this.events.subscribe('tags:clienteleTag', this.clienteleTag);
        this.events.subscribe('tag:customTag', this.customTag);
    }
    ionViewWillUnload() {
        this.events.unsubscribe('contacts:choose', this.update);
        this.events.unsubscribe('tags:clienteleTag', this.clienteleTag);
        this.events.unsubscribe('tag:customTag', this.customTag);
    }
    ionViewCanLeave() {
        if (this.type == 'edit') {
            if (this.tmpFormData != this.formData) {
                return this.confirm();
            } else {
                return true;
            }
        } else {
            return true;
        }
    }
    ngOnInit() {
        if (this.type === 'edit') {
            this.customerDetails();
        }
        this.queryProvinces();
    }
    done(r:any = undefined) {
        let phones = this.phonePicker.getPhone();
        if (phones.length != 0) {
            this.valid = true;
            this.formData.phone = phones[0];
            this.formData.phones = [];
            for (let item of phones.slice(1)) {
                if (item) {
                    this.formData.phones.push(item);
                }
            }
        }
        if (!this.valid) {
            this.nativeService.alert('请输入正确的电话号码');
            return false;
        }
        if (this.addClienteleForm.valid && this.valid) {
            console.log(this.formData);
            if (this.type === 'edit') {
                this.customerUpdate(r);
            } else {
                this.customerCreate();
            }
        }
    }
    addTag() {
        this.navCtrl.push('ClienteleTagPage', {
            tag: this.formData.label
        });
    }
    addCustomTag() {
        this.navCtrl.push('CustomTagPage', {
            tag: this.formData.labels
        });
    }
    customerCreate() {
        this.submitIng = true;
        this.appApi.customerCreate(this.formData).subscribe(
            d => {
                console.log(d);
                this.presentToast('创建成功');
                this.events.publish('clientele:create');
            },
            e => {
                this.submitIng = false;
            }
        );
    }
    customerUpdate(r:any) {
        this.submitIng = true;
        this.appApi.customerUpdate(this.formData).subscribe(
            d => {
                console.log(d);
                this.presentToast('更新成功',r);
                this.events.publish('clientele:update', this.formData.id);
            },
            e => {
                this.submitIng = false;
            }
        );
    }
    presentToast(msg,r:any = undefined) {
        const toast = this.toastCtrl.create({
            message: msg,
            position: 'middle',
            duration: 1500
        });
        toast.onDidDismiss(() => {
			if (r) {
			    r(true);
			}else{
				this.navCtrl.pop();
			}
        });
        toast.present();
    }
    queryProvinces() {
        if (this.provinces.length == 0) {
            this.appApi.queryProvinces().subscribe(d => {
                this.globalData.provinces = d;
                this.provinces = d;
            });
        }
    }
    queryCitiesByProvinceId() {
        this.appApi
            .queryCitiesByProvinceId(this.formData.provinceId)
            .subscribe(d => {
                this.city = d;
            });
    }
    customerDetails() {
        this.appApi.customerDetails(this.customerId).subscribe(d => {
            this.labelsString = d.labels ? d.labels.join(',') : '';
            if (d.phone) {
                let phone = d.phone;
                let phones = d.phones && d.phones.length > 0 ? d.phones : [];
                this.phones = [phone, ...phones];
            }
            for (let name in this.formData) {
                if (d[name]) {
                    this.formData[name] = d[name];
                }
            }
            this.tmpFormData = Utils.extend(true, {}, this.formData);
            if (d.provinceId) {
                this.queryCitiesByProvinceId();
            }
            console.log(this.tmpFormData);
        });
    }
    goContacts() {
        this.navCtrl.push('ContactsPage', {
            person: this.person
        });
    }
    confirm():Promise<boolean> {
        return new Promise((resolve,reject)=>{
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
                            this.done(resolve);
                        }
                    }
                ]
            });
            alert.present();
        });
    }
}
