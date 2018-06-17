import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { UserInfoPage } from './../user-info/user-info';


@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html',
})
export class SettingsPage {

	constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private app:App
    ) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SettingsPage');
    }
    
    /** 
     * 跳转个人资料页面 
     */    
    toUserInfoPage() {
        this.app.getRootNav().push(UserInfoPage);
    }

}
