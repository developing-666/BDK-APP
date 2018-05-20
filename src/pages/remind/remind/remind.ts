import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



@Component({
	selector: 'page-remind',
	templateUrl: 'remind.html',
})
export class RemindPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
	) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad RemindPage');
	}

}
