import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, App, Events } from 'ionic-angular';


import { GlobalData } from '../../../providers/global-data';
import { AppApi } from '../../../providers/app-api';
@Component({
	selector: 'page-clientele-tag',
	templateUrl: 'clientele-tag.html'
})
export class ClienteleTagPage {
	callback: any = this.navParams.get('callback');
	tag: any = this.navParams.get('tag');
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
		console.log('ionViewDidLoad ClienteleTagPage');
		if (this.globalData.CUSTOMER_LABEL && this.globalData.CUSTOMER_LABEL.length > 0) {
			this.tags = this.globalData.CUSTOMER_LABEL;
		} else {
			this.queryLabelByType();
		}
	}
	newTag() {
		let prompt = this.alertCtrl.create({
			title: '输入客户标签',
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
			this.tag = tag.label;
		}
	}
	queryLabelByType() {
		this.appApi.queryLabelByType('CUSTOMER_LABEL').subscribe(d => {
			console.log(d);
			this.tags = d;
			this.globalData.CUSTOMER_LABEL = d;
			this.events.publish('tags:change');
		});
	}
	labelCreate(t) {
		if (!t) {
			let alert = this.alertCtrl.create({
				title: '标签不可为空',
				buttons: ['确定']
			});
			alert.present();
		} else {
			this.appApi
				.labelCreate({
					label: t,
					type: 'CUSTOMER_LABEL'
				})
				.subscribe(d => {
					console.log(d);
					this.queryLabelByType();
				});
		}
	}
	wantDelete() {
		this.tag = '';
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
