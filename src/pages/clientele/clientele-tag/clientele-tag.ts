import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, App } from 'ionic-angular';


import { TAGS } from '../../../providers/constants';

import { AppApi } from '../../../providers/app-api';
@Component({
    selector: 'page-clientele-tag',
    templateUrl: 'clientele-tag.html'
})
export class ClienteleTagPage {
    callback: any = this.navParams.get('callback');
    tag: any = this.navParams.get('tag');
    tags: Array<any> = [];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public appApi: AppApi
    ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad ClienteleTagPage');
        this.queryLabelByType();
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
                        this.labelCreate(data.tag);
                    }
                }
            ]
        });
        prompt.present();
    }
    done() {
        this.callback(this.tag).then(() => {
            this.navCtrl.pop();
        });
    }
    selectTag(tag) {
        this.tag = tag;
    }
    queryLabelByType(){
        this.appApi
            .queryLabelByType('CUSTOMER_LABEL')
            .subscribe(d => {
                console.log(d);
                this.tags = d;
            });
    }
    labelCreate(t){
        this.appApi.labelCreate({
            label:t,
            type: 'CUSTOMER_LABEL'
        }).subscribe(d => {
            console.log(d);
        });
    }
    labelDelete(){

    }
}
