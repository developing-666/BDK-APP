import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { AppApi } from './../../../providers/app-api';
@Component({
	selector: 'page-search-clientele',
	templateUrl: 'search-clientele.html',
})
export class SearchClientelePage {
	keywords:string = '';
	constructor(
		public navCtrl: NavController,
        public navParams: NavParams,
        private appApi: AppApi
	) {}
	ionViewDidLoad() {
		console.log('ionViewDidLoad SearchClientelePage');
	}
	onInput(e){
		console.log(e);
        
	}
	onCancel(e){
		console.log(e);
	}
    search(){
        
    }
}