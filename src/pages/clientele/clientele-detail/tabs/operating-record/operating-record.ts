import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AppApi } from '../../../../../providers/app-api';
@Component({
	selector: 'page-operating-record',
	templateUrl: 'operating-record.html',
})
export class OperatingRecordPage {
	currentPage: number = 1;
	totalPages: number = 1;
	id:string = this.navParams.get('id');
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public appApi:AppApi
	) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad OperatingRecordPage');
		this.queryCustomerOperateLogByPage();
	}
	queryCustomerOperateLogByPage(){
		this.appApi.queryCustomerOperateLogByPage({
			currentPageIndex:this.currentPage,
			queryCustomerId:this.id
		}).subscribe(d=>{
			console.log(d)
		})
	}
}
