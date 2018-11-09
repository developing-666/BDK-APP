import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';


import { CardIO } from '@ionic-native/card-io';
import { AppApi } from '../../../providers/app-api';

import { img } from '../../../providers/img';


import { GlobalData } from '../../../providers/global-data';
import * as urlencode from 'urlencode';
@Component({
	selector: 'page-ionic-demo',
	templateUrl: 'ionic-demo.html',
})
export class IonicDemoPage {
	token: string;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private cardIO: CardIO,
		private app: App,
		private appApi: AppApi,
		private globalData:GlobalData
	) { }

	ionViewDidLoad() {
		console.log('window');
		this.getBaiduToken();
	}
	startCamera() {
		this.app.getRootNav().push('BankCardPage');
	}
	getBaiduToken() {
		this.appApi.getBaiduToken({
			grant_type: 'client_credentials',
			client_id: 'jbG31kliZwbArqzu76ZKCY2O',
			client_secret: 'b0qgsFiNAgzfsaqMpVcOXDs2SwI2WVYb'
		}).subscribe(d => {
			console.log(d);
			this.token = d.access_token;
			this.globalData.baiduToken = d.access_token;
			this.ocrbankcard();
		});
	}
	ocrbankcard() {
		this.appApi.ocrbankcard({
			image:img
		}).subscribe(d => {
			console.log(d);
		})
	}
	bankCard() {
		this.cardIO.canScan()
			.then(
				(res: boolean) => {
					if (res) {
						let options = {
							requireExpiry: true,
							requireCVV: false,
							requirePostalCode: false
						};
						this.cardIO.scan(options).then(d => {
							console.log(d);
						});
					}
				}
			);
	}
}
