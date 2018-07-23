import { Component, ViewChild } from '@angular/core';
import {
	NavController,
	NavParams,
	App,
	ViewController,
	List,
	Content,
	Platform,
	Events
} from 'ionic-angular';
import { AddClientelePage } from '../add-clientele/add-clientele';
import { SearchClientelePage } from '../search-clientele/search-clientele';
import { ClienteleDetailPage } from '../clientele-detail/clientele-detail';

import { AppApi } from './../../../providers/app-api';
import { Utils } from '../../../providers/utils';

@Component({
	selector: 'page-clientele',
	templateUrl: 'clientele.html'
})
export class ClientelePage {
	@ViewChild(Content) content: Content;
	@ViewChild(List) list: List;
	initQueryParams: any = {
		params: {
			queryLabel: '',
			queryKeyword: '',
			queryCustomLabel: '',
			queryFollowStatus: ''
		},
		sort: '',
		orderBy: 'DESC'
	};
	queryParams: any = {
		params: {
			queryLabel: '',
			queryKeyword: '',
			queryCustomLabel: '',
			queryFollowStatus: ''
		},
		sort: '',
		orderBy: 'DESC'
	};
	currentPage: number = 1;
	totalPages: number = 0;
	clienteles: Array<any> = [];
	value: string = '';
	openSelect: Boolean = false;
	detail: boolean = false;
	selectOptions: any = {
		cssClass: 'full-selector'
	};
	update: any = () => {
		this.currentPage = 1;
		this.content.scrollToTop(0);
		setTimeout(() => {
			this.customerQuery(this.queryParams);
		}, 0);
	};
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appApi: AppApi,
		public app: App,
		public viewCtrl: ViewController,
		private events: Events,
		public plt: Platform
	) { }
	ionViewDidLoad() {
		this.customerQuery(this.initQueryParams);
		this.events.subscribe('clientele:create', this.update);
	}
	ionViewWillUnload() {
		this.events.unsubscribe('clientele:create', this.update);
	}
	add() {
		let callback = (done): any => {
			console.log(done);
			if (done) {
				this.currentPage = 1;
				this.customerQuery(this.initQueryParams);
			}
			return Promise.resolve();
		};
		this.app.getRootNav().push(AddClientelePage, {
			callback,
			type: 'add'
		});
	}
	search() {
		this.app.getRootNav().push(SearchClientelePage);
	}
	open(): void {
		this.openSelect = !this.openSelect;
	}
	filterHide(v) {
		let tmpQueryParams = Utils.extend(true, {}, this.initQueryParams);
		tmpQueryParams.params.queryLabel = v[0].value[0].value;
		tmpQueryParams.params.queryCustomLabel = v[0].value[1].value.join(',');
		tmpQueryParams.params.queryFollowStatus = v[1].value ? v[1].value : '';
		tmpQueryParams.sort = v[2].value ? v[2].value : '';
		if (
			JSON.stringify(tmpQueryParams) != JSON.stringify(this.queryParams)
		) {
			this.queryParams = tmpQueryParams;
			this.currentPage = 1;
			this.customerQuery(this.queryParams);
		}
	}
	customerQuery(queryParams, e?: any) {
		this.appApi
			.customerQuery({
				currentPageIndex: this.currentPage,
				...queryParams
			})
			.subscribe(
				d => {
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
	itemDelete(item) {
		this.clienteles.splice(item.index, 1);
	}
	itemRemind() {
		this.list.closeSlidingItems();
	}
	itemDetails(item) {
		this.app.getRootNav().push(
			ClienteleDetailPage,
			{
				id: item.id
			},
			{
				animation: 'md-transition'
			}
		);
	}
	loadMore(e) {
		console.log(e);
		this.customerQuery(this.queryParams, e);
	}
	doRefresh(e) {
		this.currentPage = 1;
		this.customerQuery(this.queryParams, e);
	}
}
