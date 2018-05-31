import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'page-add-clientele-remind',
	templateUrl: 'add-clientele-remind.html',
})
export class AddClienteleRemindPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
	) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AddClienteleRemindPage');
	}

}