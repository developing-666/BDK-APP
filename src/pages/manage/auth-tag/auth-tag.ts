import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams, AlertController,Events, } from 'ionic-angular';


import { GlobalData } from '../../../providers/global-data';
import { AppApi } from '../../../providers/app-api';
@IonicPage()
@Component({
    selector: 'page-auth-tag',
    templateUrl: 'auth-tag.html'
})
export class AuthTagPage {
    tag: any = this.navParams.get('tag');
    tags: Array<any> = [];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public appApi: AppApi,
        public globalData: GlobalData,
        private events: Events,
    ) {}

    ionViewDidLoad() {
        if (
            this.globalData.ALLROLE &&
            this.globalData.ALLROLE.length > 0
        ) {
            this.tags = this.globalData.ALLROLE;
        } else {
            this.queryAllRole();
        }
    }
    done() {
		 this.events.publish('tag:authTag',this.tag);
		 this.navCtrl.pop();
    }
    selectTag(tag) {
        this.tag = tag;
    }
    queryAllRole() {
        this.appApi.queryAllRole().subscribe(d => {
            console.log(d);
            this.tags = d;
            this.globalData.ALLROLE = d;
            // this.events.publish('tags:change');
        });
    }
}
