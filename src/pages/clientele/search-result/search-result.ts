import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, List} from 'ionic-angular';

import { AppApi } from './../../../providers/app-api';
@IonicPage()
@Component({
	selector: 'page-search-result',
	templateUrl: 'search-result.html'
})
export class SearchResultPage {
	@ViewChild(List) list: List;
	queryParams: any = {
		params: {
			queryLabel: '',
			queryKeyword: this.navParams.get('name'),
			queryCustomLabel: '',
			queryFollowStatus: ''
		},
		sort: '',
		orderBy: 'DESC'
	};
	currentPage: number = 1;
	totalPages: number = 0;
	clienteles: Array<any> = [];
	item: any = this.navParams.get('item');
	activeId: string = this.navParams.get('item') ? this.navParams.get('item').id : '';
	type: string = this.navParams.get('type');
	detail: boolean = false;
	noPush: boolean = this.navParams.get('type') == 'search' ? false : true;
	title: string =
		this.navParams.get('type') == 'search' ? '搜索结果' : '选择客户';
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appApi: AppApi,
		public viewCtrl: ViewController,
	) { }
	ionViewDidLoad() {
		console.log('noPush' + this.noPush);
		console.log('detail' + this.detail);
		this.customerQuery(this.queryParams);
	}
	customerQuery(queryParams, e?: any) {
		this.appApi
			.customerQuery({
				currentPageIndex: this.currentPage,
				...queryParams
			})
			.subscribe(d => {
				if (this.currentPage == 1) {
					this.clienteles = d.items;
				} else {
					this.clienteles = this.clienteles.concat(d.items);
				}
				this.totalPages = d.totalPages;
				this.currentPage++;
				if (e) {
					setTimeout(() => {
						e.complete();
					}, 200);
				}
			});
	}
	itemDelete(item) {
		this.clienteles.splice(item.index, 1);
	}
	itemRemind() {
		this.list.closeSlidingItems();
	}
	itemDetails(item) {
		if (this.type == 'search') {
			this.navCtrl.push(
				'ClienteleDetailPage',
				{
					id: item.id
				},
				{
					animation: 'md-transition'
				}
			);
		} else {
			this.activeId = item.id;
			this.viewCtrl.dismiss(item);
		}
	}
	loadMore(e) {
		console.log(e);
		this.customerQuery(this.queryParams, e);
	}
	dismiss() {
		this.viewCtrl.dismiss();
	}
	add() {
		let callback = (done): any => {
			console.log(done);
			if (done) {
				this.currentPage = 1;
				this.customerQuery(this.queryParams);
			}
			return Promise.resolve();
		};
		this.navCtrl.push('AddClientelePage', {
			callback,
			type: 'add'
		});
	}
}
