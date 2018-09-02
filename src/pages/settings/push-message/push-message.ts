import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GlobalData } from './../../../providers/global-data';
import { AppApi } from './../../../providers/app-api';

@IonicPage()
@Component({
	selector: 'page-push-message',
	templateUrl: 'push-message.html'
})
export class PushMessagePage {
	userInfo: any = this.globalData.user;
	isNewMsgNotify: Boolean = this.globalData.user.newMsgNotify == 'OPEN'; //新推送消息通知 'OPEN' 'CLOSE'
	isVoiceNotify: Boolean = this.globalData.user.voiceNotify == 'OPEN'; //语音通话提醒
	isDetailNotify: Boolean = this.globalData.user.detailNotify == 'OPEN'; //通知显示消息详情
	isVoice: Boolean = this.globalData.user.voice == 'OPEN'; //声音
	isShake: Boolean = this.globalData.user.shake == 'OPEN'; //震动
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public globalData: GlobalData,
		private appApi: AppApi
	) { }
	ionViewDidLoad() {
		console.log('ionViewDidLoad PushMessagePage');
	}
	statusChange(type: String) {
		let param = {};
		switch (type) {
			case 'isNewMsgNotify':
				param = {
					newMsgNotify: this.isNewMsgNotify ? 'OPEN' : 'CLOSE'
				};
				this.appApi.updateUserInfo(param).subscribe(
					d => {
						this.globalData.user.newMsgNotify = this.isNewMsgNotify
							? 'OPEN'
							: 'CLOSE';
					},
					err => {
						console.log(err);
						this.isNewMsgNotify = !this.isNewMsgNotify;
					}
				);
				break;
			case 'isVoiceNotify':
				param = {
					voiceNotify: this.isVoiceNotify ? 'OPEN' : 'CLOSE'
				};
				this.appApi.updateUserInfo(param).subscribe(
					d => {
						this.globalData.user.voiceNotify = this.isVoiceNotify
							? 'OPEN'
							: 'CLOSE';
					},
					err => {
						console.log(err);
						this.isVoiceNotify = !this.isVoiceNotify;
					}
				);
				break;
			case 'isDetailNotify':
				param = {
					detailNotify: this.isDetailNotify ? 'OPEN' : 'CLOSE'
				};
				this.appApi.updateUserInfo(param).subscribe(
					d => {
						this.globalData.user.detailNotify = this.isDetailNotify
							? 'OPEN'
							: 'CLOSE';
					},
					err => {
						console.log(err);
						this.isDetailNotify = !this.isDetailNotify;
					}
				);
				break;
			case 'isVoice':
				param = {
					voice: this.isVoice ? 'OPEN' : 'CLOSE'
				};
				this.appApi.updateUserInfo(param).subscribe(
					d => {
						this.globalData.user.voice = this.isVoice
							? 'OPEN'
							: 'CLOSE';
					},
					err => {
						console.log(err);
						this.isVoice = !this.isVoice;
					}
				);
				break;

			default:
				param = {
					shake: this.isShake ? 'OPEN' : 'CLOSE'
				};
				this.appApi.updateUserInfo(param).subscribe(
					d => {
						this.globalData.user.shake = this.isShake
							? 'OPEN'
							: 'CLOSE';
					},
					err => {
						console.log(err);
						this.isShake = !this.isShake;
					}
				);
				break;
		}
	}
}
