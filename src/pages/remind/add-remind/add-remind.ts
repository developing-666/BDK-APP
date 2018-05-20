import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



@Component({
	selector: 'page-add-remind',
	templateUrl: 'add-remind.html',
})
export class AddRemindPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
	) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AddRemindPage');
	}
	add(){
		
	}
}
