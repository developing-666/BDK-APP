import { Injectable } from '@angular/core';

import {
	NavController,
	App
} from 'ionic-angular';

import {GlobalData} from './global-data';


@Injectable()
/**
 * 处理极光推送通知
 */
export class JpushNotification {
	activePage:any = undefined;
	constructor(
		private app:App,
		private globalData: GlobalData,
	) { }
	getCurrentPage() {
		// const activeNav = this.navCtrl.getActive();
		// console.log(activeNav);
	}
	done(d) {
		let nav = this.globalData.nav;
		if (nav.length() > 1) {
			if(nav.getActive().name=='ClienteleDetailPage'){
				nav.popToRoot({
					animation: 'md-transition'
				});
			}else{
				nav.popToRoot();
			}
		}
		console.log('type-----------------');
		console.log(d.type);
		switch(d.type){
			case 'remind':this.remind(d); break;
			case 'follow':this.follow(d); break;
			case 'clientele':this.clientele(d); break;
		}
	}
	remind(d){
		this.app.getRootNav().push('AddRemindPage',{
			type:JSON.parse(d.data).type
		});
	}
	follow(d){
		// this.navCtrl.popToRoot();
		console.log('follow----SettingRecordPage');
		if(d.event=='create'){
			this.app.getRootNav().push('SettingRecordPage',{
				taskId:JSON.parse(d.data).taskId
			});
		}else{
			this.app.getRootNav().push('SettingRecordPage',{
				followId:JSON.parse(d.data).id
			});
		}

	}
	clientele(d){
		this.app.getRootNav().push(
			'ClienteleDetailPage',
			{
				id: JSON.parse(d.data).id
			},
			{
				animation: 'md-transition'
			}
		);
	}
}
