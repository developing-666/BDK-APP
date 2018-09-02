import { Component } from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams,
    AlertController,
    Events,
    ToastController
} from 'ionic-angular';

import { GlobalData } from '../../../providers/global-data';
import { AppApi } from '../../../providers/app-api';
@IonicPage()
@Component({
    selector: 'page-clientele-tag',
    templateUrl: 'clientele-tag.html'
})
export class ClienteleTagPage {
    tag: any = this.navParams.get('tag');
    type: any = this.navParams.get('type');
    tags: Array<any> = [];
    deleteIng: boolean = false;
    deleteId: string = '';
    tmp: any = this.navParams.get('tag');
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public appApi: AppApi,
        public globalData: GlobalData,
        private events: Events,
        private toastCtrl: ToastController
    ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad ClienteleTagPage');
        if (
            this.globalData.CUSTOMER_LABEL &&
            this.globalData.CUSTOMER_LABEL.length > 0
        ) {
            this.tags = this.globalData.CUSTOMER_LABEL;
        } else {
            this.queryLabelByType();
        }
    }
    newTag() {
        let prompt = this.alertCtrl.create({
            title: '输入客户标签',
            inputs: [
                {
                    name: 'tag',
                    placeholder: '请输入客户标签'
                }
            ],
            buttons: [
                {
                    text: '取消'
                },
                {
                    text: '确定',
                    handler: data => {
                        console.log(data);
                        if (data.tag.length > 7) {
                            let toast = this.toastCtrl.create({
                                message: '标签不能多于7字',
                                duration: 1500,
                                position: 'top',
                                cssClass: 'danger'
                            });
                            toast.present();
                        } else {
                            this.labelCreate(data.tag);
                        }
                    }
                }
            ]
        });
        prompt.present();
    }
    done() {
        this.events.publish('tags:clienteleTag', this.tag);
        this.navCtrl.pop();
    }
    selectTag(tag) {
        if (this.deleteIng && this.type == 'edit') {
            this.deleteId = tag.id;
        } else if(!this.deleteIng && this.type != 'edit'){
            this.tag = tag.label;
        }
    }
    queryLabelByType() {
        this.appApi.queryLabelByType('CUSTOMER_LABEL').subscribe(d => {
            console.log(d);
            this.tags = d;
            this.globalData.CUSTOMER_LABEL = d;
            this.events.publish('tags:change');
        });
    }
    labelCreate(t) {
        if (!t) {
            let alert = this.alertCtrl.create({
                title: '标签不可为空',
                buttons: ['确定']
            });
            alert.present();
        } else {
            this.appApi
                .labelCreate({
                    label: t,
                    type: 'CUSTOMER_LABEL'
                })
                .subscribe(d => {
                    console.log(d);
                    this.queryLabelByType();
                });
        }
    }
    wantDelete() {
        this.deleteId = '';
        this.deleteIng = !this.deleteIng;
        if (this.deleteIng) {
            this.tag = '';
        } else {
            this.tag = this.tmp;
        }
    }
    confirm() {
        let alert = this.alertCtrl.create({
            title: '删除操作会影响所有拥有该标签的客户，是否确定删除?',
            buttons: [
                {
                    text: '取消',
                    role: 'cancel'
                },
                {
                    text: '确认',
                    handler: () => {
                        this.labelDelete();
                    }
                }
            ]
        });
        alert.present();
    }
    labelDelete() {
        this.appApi.labelDelete(this.deleteId).subscribe(d => {
            console.log(d);
            this.deleteId = '';
            this.queryLabelByType();
        });
    }
}
