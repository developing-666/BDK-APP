import { Component } from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';

@Component({
	selector: 'page-contact',
	templateUrl: 'contact.html'
})
export class ContactPage {

	constructor(
		public navCtrl: NavController,
		public viewCtrl: ViewController
	) {}
	dismissModal(){
		this.viewCtrl.dismiss();
	}
}
