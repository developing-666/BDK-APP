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
import { Utils } from '../../../providers/utils';
@IonicPage()
@Component({
    selector: 'page-custom-tag',
    templateUrl: 'custom-tag.html'
})
export class CustomTagPage {
    tag: Array<any> = this.navParams.get('tag')
        ? Utils.extend(true, [], this.navParams.get('tag'))
        : [];
    type: any = this.navParams.get('type');
    tags: Array<any> = [];
    deleteIng: boolean = false;
    deleteId: string = '';
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
        if (
            this.globalData.CUSTOMER_LABELS &&
            this.globalData.CUSTOMER_LABELS.length > 0
        ) {
            this.tags = this.globalData.CUSTOMER_LABELS;
        } else {
            this.queryLabelByType();
        }
    }
    newTag() {
        let prompt = this.alertCtrl.create({
            title: '输入自定义标签',
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
        this.events.publish('tag:customTag', this.tag);
        this.navCtrl.pop();
    }
    selectTag(tag) {
        if (this.deleteIng) {
            this.deleteId = tag.id;
        } else {
            let index = this.tag.indexOf(tag.label);
            if (index > -1) {
                this.tag.splice(index, 1);
            } else {
                if (this.tag.length < 5) {
                    this.tag.push(tag.label);
                }
            }
        }
    }
    queryLabelByType() {
        this.appApi.queryLabelByType('CUSTOMER_LABELS').subscribe(d => {
            console.log(d);
            this.tags = d;
            this.globalData.CUSTOMER_LABELS = d;
            this.events.publish('tags:change');
        });
    }
    labelCreate(t) {
        this.appApi
            .labelCreate({ label: t, type: 'CUSTOMER_LABELS' })
            .subscribe(d => {
                console.log(d);
                this.queryLabelByType();
            });
    }
    wantDelete() {
        this.tag = [];
        this.deleteId = '';
        this.deleteIng = !this.deleteIng;
        console.log(this.deleteIng);
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
            this.events.publish('tags:change');
        });
    }
}
