
import { Injectable } from '@angular/core';
import {
	NavController,
	App,
	Events
} from 'ionic-angular';
import {GlobalData} from './global-data';
import { ThreeDeeTouch, ThreeDeeTouchQuickAction, ThreeDeeTouchForceTouch } from '@ionic-native/three-dee-touch';



@Injectable()
export class ThreeDeeTouchProvider {

	constructor(
		public threeDeeTouch:ThreeDeeTouch,
		private app:App,
		private globalData: GlobalData,
		public events:Events
	) {}
	init(nav) {
		this.globalData.nav = nav;
		let actions: Array<ThreeDeeTouchQuickAction> = [
			{
				type: 'remind',
				title: '任务列表',
				iconTemplate: 'remind'
			},
			{
				type: 'add-other-remind',
				title: '新建其他提醒',
				iconTemplate: 'add-other-remind'
			},
			{
				type: 'add-clientele-remind',
				title: '新建客户提醒',
				iconTemplate: 'add-clientele-remind'
			},
			{
				type: 'add-clientele',
				title: '新增客户',
				iconTemplate: 'add-clientele'
			}
		];
		this.threeDeeTouch.configureQuickActions(actions);
		this.threeDeeTouch.onHomeIconPressed().subscribe(
			payload => {
				// returns an object that is the button you presed
				console.log(`Pressed the ${payload.title} button`)
				console.log(payload.type)
				this.done(payload);
			}
		)
	}
	done(d){
		let nav = this.globalData.nav;
		if (nav.length() > 1) {
			if(nav.getActive().name=='ClienteleDetailPage'){
				nav.popToRoot({
					animation: 'md-transition'
				});
			}else{
				nav.popToRoot();
			}
		};
		this.loadView(d);
	}
	loadView(d){
		switch(d.type){
			case 'remind':this.remind(); break;
			case 'add-clientele':this.addClientele(); break;
			case 'add-clientele-remind':this.addClienteleRemind(); break;
			case 'add-other-remind':this.addOtherRemind(); break;
		}
	}
	remind(){
		this.events.publish('selectTab',1);
	}
	addOtherRemind(){
		this.app.getRootNav().push('AddRemindPage',{
			type:'other'
		});
	}
	addClienteleRemind(){
		this.app.getRootNav().push('AddRemindPage',{
			type:'clientele'
		});
	}
	addClientele(){
		this.app.getRootNav().push('AddClientelePage',{
			type:'add'
		});
	}
}
