import { ViewChild,Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, NavParams } from 'ionic-angular';


@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	@ViewChild('loginForm') loginForm: NgForm;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
	) { }

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

}
