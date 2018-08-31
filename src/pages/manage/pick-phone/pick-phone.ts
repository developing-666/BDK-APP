import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams, Events,ViewController } from 'ionic-angular';


import { AppApi } from '../../../providers/app-api';

@IonicPage()
@Component({
	selector: 'page-pick-phone',
	templateUrl: 'pick-phone.html',
})
export class PickPhonePage {
	virtualPhoneCityId: string = this.navParams.get('cityId');
	activePhone: string = this.navParams.get('phone')?this.navParams.get('phone'):{};
	safetyPhones: Array<any> = [];
	isHasNext: boolean = false;
	currentPage: number = 1;
	constructor(
		public viewCtrl: ViewController,
		public navCtrl: NavController,
		public navParams: NavParams,
		private appApi: AppApi,
		private events: Events,
	) { }

	ionViewDidLoad() {
		this.querySafetyPhones();
	}
	querySafetyPhones(e?: any) {
		this.appApi
			.querySafetyPhones({
				currentPageIndex: this.currentPage,
				pageSize: 1,
				params: {
					queryCityId: this.virtualPhoneCityId
				}
			})
			.subscribe(
				d => {
					this.isHasNext = d.isHasNext;
					if (this.currentPage == 1) {
						this.safetyPhones = d.items;
					} else {
						this.safetyPhones = this.safetyPhones.concat(d.items);
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
	loadMore(e) {
		this.querySafetyPhones(e);
	}
	doRefresh(e) {
		this.currentPage = 1;
		this.querySafetyPhones(e);
	}
	pickPhone(item){
		this.activePhone=item;
	}
	close(){
		this.viewCtrl.dismiss();
	}
	done(){
		this.viewCtrl.dismiss();
		this.events.publish('pickPhone', this.activePhone);
	}
}
