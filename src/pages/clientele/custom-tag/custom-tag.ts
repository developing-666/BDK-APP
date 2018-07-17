import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, Navbar, Events } from 'ionic-angular';

import { GlobalData } from '../../../providers/global-data';
import { AppApi } from '../../../providers/app-api';
@Component({
	selector: 'page-custom-tag',
	templateUrl: 'custom-tag.html'
})
export class CustomTagPage {
	@ViewChild(Navbar) navBar: Navbar;
	callback: any = this.navParams.get('callback');
	tag: Array<any> = this.navParams.get('tag');
	tags: Array<any> = [];
	deleteIng: boolean = false;
	deleteId: string = '';
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public alertCtrl: AlertController,
		public appApi: AppApi,
		public globalData: GlobalData,
		private events: Events,
	) { }

	ionViewDidLoad() {
		this.navBar.backButtonClick = (e: UIEvent) => {
			this.tag = [];
			this.callback(this.tag).then(() => {
				this.navCtrl.pop();
			});
		};
		if (this.globalData.CUSTOMER_LABELS && this.globalData.CUSTOMER_LABELS.length > 0) {
			this.tags = this.globalData.CUSTOMER_LABELS;
		} else {
			this.queryLabelByType();
		}
	}
	newTag() {
		let prompt = this.alertCtrl.create({
			title: '输入自定义标签',
			inputs: [
				{
					name: 'tag',
					placeholder: '请输入客户标签'
				}
			],
			buttons: [
				{
					text: '取消'
				},
				{
					text: '确定',
					handler: data => {
						console.log(data);
						this.labelCreate(data.tag);
					}
				}
			]
		});
		prompt.present();
	}
	done() {
		this.callback(this.tag).then(() => {
			this.navCtrl.pop();
		});
	}
	selectTag(tag) {
		if (this.deleteIng) {
			this.deleteId = tag.id;
		} else {
			let index = this.tag.indexOf(tag.label);
			if (index > -1) {
				this.tag.splice(index, 1);
			} else {
				if (this.tag.length<5) {
				    this.tag.push(tag.label);
				}
			}
		}
	}
	queryLabelByType() {
		this.appApi.queryLabelByType('CUSTOMER_LABELS').subscribe(d => {
			console.log(d);
			this.tags = d;
			this.globalData.CUSTOMER_LABELS = d;
			this.events.publish('tags:change');
		});
	}
	labelCreate(t) {
		this.appApi
			.labelCreate({ label: t, type: 'CUSTOMER_LABELS' })
			.subscribe(d => {
				console.log(d);
				this.queryLabelByType();
			});
	}
	wantDelete() {
		this.tag = [];
		this.deleteId = '';
		this.deleteIng = !this.deleteIng;
		console.log(this.deleteIng);
	}
	confirm() {
		let alert = this.alertCtrl.create({
			title: '确认删除?',
			buttons: [
				{
					text: '取消',
					role: 'cancel'
				},
				{
					text: '确认',
					handler: () => {
						this.labelDelete();
					}
				}
			]
		});
		alert.present();
	}
	labelDelete() {
		this.appApi.labelDelete(this.deleteId).subscribe(d => {
			console.log(d);
			this.queryLabelByType();
		});
	}
}
