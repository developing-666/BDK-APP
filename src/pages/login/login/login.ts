import { ViewChild,Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, NavParams } from 'ionic-angular';

import { AppApi } from '../../../providers/app-api';


import { HttpHeader } from '../../../providers/http-header';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	@ViewChild('loginForm') loginForm: NgForm;
	formData:any= {};
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appApi: AppApi,
		private httpHeader: HttpHeader
	) { }
	mushrooms: boolean = true;

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}
	login(){
	  	this.appApi.login(this.formData).subscribe((d)=>{
			console.log(d);
			this.httpHeader.token = d.data? d.data:null;
		});
	}

}
