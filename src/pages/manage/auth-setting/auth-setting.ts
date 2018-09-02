import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content, AlertController, List } from 'ionic-angular';



import { AppApi } from '../../../providers/app-api';

@IonicPage()
@Component({
	selector: 'page-auth-setting',
	templateUrl: 'auth-setting.html',
})
export class AuthSettingPage {
	@ViewChild(List) list: List;
	@ViewChild(Content) content: Content;
	currentPage: number = 1;
	isHasNext: boolean = false;
	auths: Array<any> = [];
	update: any = () => {
		this.currentPage = 1;
		this.content.scrollToTop(0);
		setTimeout(() => {
			this.queryUserByPage();
		}, 0);
	};
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public events: Events,
		private appApi: AppApi,
		private alertCtrl: AlertController,
	) { }

	ionViewDidLoad() {
		this.queryUserByPage();
		this.events.subscribe('auth:create', this.update);
		this.events.subscribe('auth:update', this.update);
	}
	ionViewWillUnload() {
		this.events.unsubscribe('auth:create', this.update);
		this.events.unsubscribe('auth:update', this.update);
	}
	queryUserByPage(e?: any) {
		this.appApi.queryUserByPage({
			currentPageIndex: this.currentPage
		}).subscribe(
			d => {
				this.isHasNext = d.isHasNext;
				if (this.currentPage == 1) {
					this.auths = d.items;
				} else {
					this.auths = this.auths.concat(d.items);
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
	add() {
		this.navCtrl.push('AddAuthPage');
	}
	delete(item, index) {
		let alert = this.alertCtrl.create({
			title: '确认删除？',
			buttons: [
				{
					text: '取消',
					role: 'cancel'
				},
				{
					text: '确认',
					handler: () => {
						this.appApi.userDelete(item.id).subscribe(d => {
							console.log(d);
							this.auths.splice(index, 1);
						});
					}
				}
			]
		});
		alert.present();
	}
	edit(item) {
		this.list.closeSlidingItems();
		this.navCtrl.push('AddAuthPage', {
			item,
			type: 'edit'
		});
	}
	loadMore(e) {
		this.queryUserByPage(e);
	}
	doRefresh(e) {
		this.currentPage = 1;
		this.queryUserByPage(e);
	}
}
