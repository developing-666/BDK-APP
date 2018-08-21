import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events, Content } from 'ionic-angular';


import { AddAuthPage } from '../add-auth/add-auth';


import { AppApi } from '../../../providers/app-api';
@Component({
	selector: 'page-auth-setting',
	templateUrl: 'auth-setting.html',
})
export class AuthSettingPage {
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
	) { }

	ionViewDidLoad() {
		this.queryUserByPage();
		this.events.subscribe('auth:create', this.update);
	}
	ionViewWillUnload() {
		this.events.unsubscribe('auth:create', this.update);
	}
	queryUserByPage(e?: any) {
		this.appApi.queryUserByPage({
			currentPageIndex: this.currentPage
		}).subscribe(d => {
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
			})
	}
	add() {
		this.navCtrl.push(AddAuthPage);
	}

	loadMore(e) {
		this.queryUserByPage(e);
	}
	doRefresh(e) {
		this.currentPage = 1;
		this.queryUserByPage(e);
	}
}
