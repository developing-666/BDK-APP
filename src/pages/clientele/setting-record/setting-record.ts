import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OperatingRecordPage } from './tabs/operating-record/operating-record';

@Component({
	selector: 'page-setting-record',
	templateUrl: 'setting-record.html',
})
export class SettingRecordPage {
	tabPage = OperatingRecordPage;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
	) {}

	ionViewDidLoad() {
	}

}