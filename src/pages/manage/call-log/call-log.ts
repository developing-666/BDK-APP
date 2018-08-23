import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,Platform,List,Content } from 'ionic-angular';

import { AppApi } from '../../../providers/app-api';
@Component({
	selector: 'page-call-log',
	templateUrl: 'call-log.html',
})
export class CallLogPage {
	@ViewChild(List) list: List;
	@ViewChild(Content) content: Content;
	currentPage: number = 1;
	isHasNext: boolean = false;
	logs: Array<any> = [];
	queryDate:string = undefined;
	queryCalled:string = undefined;
	update: any = () => {
		this.currentPage = 1;
		this.content.scrollToTop(0);
		setTimeout(() => {
			this.queryCallLog();
		}, 0);
	};
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public plt: Platform,
		private appApi:AppApi
	) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CallLogPage');
		this.queryCallLog();
	}
	queryCallLog(e?: any){
		this.appApi.queryCallLog({
			currentPageIndex: this.currentPage,
			params:{
				queryStartDate:this.queryDate,
				queryEndDate:this.queryDate,
				queryCalled:this.queryCalled
			}
		}).subscribe(
			d => {
				this.isHasNext = d.isHasNext;
				if (this.currentPage == 1) {
					this.logs = d.items;
				} else {
					this.logs = this.logs.concat(d.items);
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
		)
	}
	loadMore(e) {
		this.queryCallLog(e);
	}
	doRefresh(e) {
		this.currentPage = 1;
		this.queryCallLog(e);
	}
}
