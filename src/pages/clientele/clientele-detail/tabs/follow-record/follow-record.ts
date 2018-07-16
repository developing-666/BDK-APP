import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';

import { AppApi } from '../../../../../providers/app-api';

import { SettingRecordPage } from '../../../setting-record/setting-record';
@Component({
	selector: 'page-follow-record',
	templateUrl: 'follow-record.html'
})
export class FollowRecordPage {
	currentPage: number = 1;
	totalPages: number = 1;
	id: string = this.navParams.get('id');
	record: Array<any> = [];
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public appApi: AppApi,
		public app: App
	) { }

	ionViewDidLoad() {
		console.log('ionViewDidLoad NotFollowPage');
		this.queryCustomerFollowDetailByPage();
	}
	queryCustomerFollowDetailByPage(e?: any) {
		this.appApi
			.queryCustomerFollowDetailByPage({
				currentPageIndex: this.currentPage,
				params: {
					queryCustomerId: this.id,
					queryFetchOnwer:true
				}
			})
			.subscribe(
				d => {
					if (this.currentPage == 1) {
						this.record = d.items;
					} else {
						this.record = this.record.concat(d.items);
					}
					this.totalPages = d.totalPages;
					this.currentPage++;
					if (e) {
						setTimeout(() => {
							e.complete();
						}, 200);
					}
				},
				err => {
					console.log(err);
					if (e) {
						setTimeout(() => {
							e.complete();
						}, 200);
					}
				}
			);
	}
	doRefresh(e) {
		console.log(e);
		this.currentPage = 1;
		this.queryCustomerFollowDetailByPage(e);
	}
	loadMore(e) {
		console.log(e);
	}
	itemClick(e, item) {
		e.stopPropagation();
		e.preventDefault();
	}
	add() {
		let refresh = (done): any => {
			this.currentPage = 1;
			this.queryCustomerFollowDetailByPage();
			return Promise.resolve();
		};
		this.app.getRootNav().push(SettingRecordPage, {
			customerId: this.id,
			refresh
		});
	}
}
