import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'page-operating-record',
	templateUrl: 'operating-record.html',
})
export class OperatingRecordPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad OperatingRecordPage');
	}

}