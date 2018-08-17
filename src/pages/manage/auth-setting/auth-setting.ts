import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
	selector: 'page-auth-setting',
	templateUrl: 'auth-setting.html',
})
export class AuthSettingPage {
	listData:Array<any> = [];
	currentPage: number = 2;
	isHasNext: boolean = false;
	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AuthSettingPage');
	}

}
