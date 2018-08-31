import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';


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
		this.app.getRootNav().push('AuthSettingPage');

	}
	goCallLog() {
		this.app.getRootNav().push('CallLogPage');
	}
}
