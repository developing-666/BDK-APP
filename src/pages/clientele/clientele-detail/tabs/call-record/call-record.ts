import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppApi } from '../../../../../providers/app-api';
@IonicPage()
@Component({
	selector: 'page-call-record',
	templateUrl: 'call-record.html',
})
export class CallRecordPage {
	currentPage: number = 1;
	id: string = this.navParams.get('id');
	record: Array<any> = [];
	isHasNext: boolean = false;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public appApi: AppApi
	) { }

	ionViewDidLoad() {
		this.callRecord();
	}
	callRecord(e?: any) {
		this.appApi
			.callRecord({
				currentPageIndex: this.currentPage,
				params: {
					queryCustomerId: this.id
				}
			})
			.subscribe(
				d => {
					this.isHasNext = d.isHasNext;
					if (this.currentPage == 1) {
						this.record = d.items;
					} else {
						this.record = this.record.concat(d.items);
					}
					setTimeout(() => {
						this.currentPage++;
					}, 0);
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
	getRecord(item) {
		return {
			audioUrl: item.recordPath,
			duration: item.callTimeDuration
		}
	}
	doRefresh(e) {
		this.currentPage = 1;
		this.callRecord(e);
	}
	loadMore(e) {
		this.callRecord(e);
	}
}
