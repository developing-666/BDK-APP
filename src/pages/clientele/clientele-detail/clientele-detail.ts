import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OperatingRecordPage } from './tabs/operating-record/operating-record';

@Component({
	selector: 'page-clientele-detail',
	templateUrl: 'clientele-detail.html',
})
export class ClienteleDetailPage {
	tabPage = OperatingRecordPage;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
	) {}

	ionViewDidLoad() {
	}

}