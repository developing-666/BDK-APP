import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
	selector: 'page-bank-card',
	templateUrl: 'bank-card.html',
})
export class BankCardPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BankCardPage');
	}

}
