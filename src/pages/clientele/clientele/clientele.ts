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

import { AppApi } from './../../../providers/app-api';
import { Utils } from '../../../providers/utils';
import { GlobalData } from '../../../providers/global-data';

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
	isHasNext: boolean = false;
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
		public plt: Platform,
		public globalData: GlobalData
	) { }
	ionViewDidLoad() {
		this.customerQuery(this.initQueryParams);
		this.events.subscribe('clientele:create', this.update);
		this.events.subscribe('user:modalLogin', this.update);
	}
	ionViewWillUnload() {
		this.events.unsubscribe('clientele:create', this.update);
		this.events.unsubscribe('user:modalLogin', this.update);
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
		this.app.getRootNav().push('AddClientelePage', {
			callback,
			type: 'add'
		});
	}
	search() {
		this.app.getRootNav().push('SearchClientelePage');
	}
	open(): void {
		this.openSelect = !this.openSelect;
	}
	filterHide(v) {
		let sorts = this.getSorts(v[2].value);
		let tmpQueryParams = Utils.extend(true, {}, this.initQueryParams);
		tmpQueryParams.params.queryLabel = v[0].value[0].value;
		tmpQueryParams.params.queryCustomLabel = v[0].value[1].value.join(',');
		tmpQueryParams.params.queryFollowStatus = v[1].value ? v[1].value : '';
		tmpQueryParams.sort = sorts ? sorts.sort : '';
		tmpQueryParams.orderBy = sorts ? sorts.orderBy : 'DESC';
		if (
			JSON.stringify(tmpQueryParams) != JSON.stringify(this.queryParams)
		) {
			this.queryParams = tmpQueryParams;
			this.currentPage = 1;
			this.customerQuery(this.queryParams);
		}
	}
	getSorts(s){
		if(!s){
			return undefined;
		}else{
			let tmp = s.split('_');
			let orderBy = tmp.pop();
			return {
				sort:tmp.join('_'),
				orderBy:orderBy
			}
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
					this.isHasNext = d.isHasNext;
					if (this.currentPage == 1) {
						this.clienteles = d.items;
					} else {
						this.clienteles = this.clienteles.concat(d.items);
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
	itemDelete(item) {
		this.clienteles.splice(item.index, 1);
	}
	itemRemind() {
		this.list.closeSlidingItems();
	}
	itemAllot(){
		this.list.closeSlidingItems();
	}
	itemDetails(item) {
		this.app.getRootNav().push(
			'ClienteleDetailPage',
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
