import { Injectable } from '@angular/core';

import {
	NavController,
	App
} from 'ionic-angular';


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
		// public navCtrl: NavController,
	) { }
	getCurrentPage() {
		// const activeNav = this.navCtrl.getActive();
		// console.log(activeNav);
	}
	done(d,page) {
		this.activePage = page;
		console.log('type-----------------');
		let data = JSON.parse(JSON.stringify(d));
		console.log(data);
		console.log(data.type==='follow');

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
		console.log('follow')
		this.app.getRootNavs().push(SettingRecordPage,{
			followId:d.taskId
		});
	}
	clientele(d){

	}
}
