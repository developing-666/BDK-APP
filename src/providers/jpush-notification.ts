import { Injectable } from '@angular/core';

import {
	NavController,
	App
} from 'ionic-angular';

import {GlobalData} from './global-data';

import { AddRemindPage } from '../pages/remind/add-remind/add-remind';
import { AddClientelePage } from '../pages/clientele/add-clientele/add-clientele';
import { SettingRecordPage } from '../pages/clientele/setting-record/setting-record';

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

		switch(d.type){
			case 'remind':this.remind(d); break;
			case 'follow':this.follow(d); break;
			case 'clientele':this.clientele(d); break;
		}
	}
	remind(d){
		// if(this.activePage.anme==='AddRemindPage'){
		//
		// }else{
		//
		// }
		// this.navCtrl.popToRoot();
		this.app.getRootNavs().push(AddRemindPage);
	}
	follow(d){
		// this.navCtrl.popToRoot();
		console.log('follow----SettingRecordPage');
		this.app.getRootNav().push(SettingRecordPage,{
			taskId:JSON.parse(d.data).taskId
		});
	}
	clientele(d){

	}
}
