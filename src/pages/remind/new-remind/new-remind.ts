import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



@Component({
	selector: 'page-new-remind',
	templateUrl: 'new-remind.html',
})
export class NewRemindPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
	) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad NewRemindPage');
	}

}
