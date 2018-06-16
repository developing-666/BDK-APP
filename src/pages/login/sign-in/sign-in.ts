import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AppApi } from '../../../providers/app-api';

@Component({
	selector: 'page-sign-in',
	templateUrl: 'sign-in.html',
})
export class SignInPage {
	formData: any = {
		validCode: 1234
	};
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appApi: AppApi
	) { }

	ionViewDidLoad() {
		console.log('ionViewDidLoad SignInPage');
	}
	signIn() {
		console.log(this.formData);
		this.appApi.signIn(this.formData).subscribe((d)=>{
			console.log(d)
		});
	}

}
