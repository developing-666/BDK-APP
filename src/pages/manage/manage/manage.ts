import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';


import { AuthSettingPage } from '../auth-setting/auth-setting';
import { CallLogPage } from '../call-log/call-log';

@Component({
	selector: 'page-manage',
	templateUrl: 'manage.html',
})
export class ManagePage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public app: App
	) { }

	ionViewDidLoad() {
		console.log('ionViewDidLoad ManagePage');
	}
	goAuth() {
		this.app.getRootNav().push(AuthSettingPage);

	}
	goCallLog() {
		this.app.getRootNav().push(CallLogPage);
	}
}
