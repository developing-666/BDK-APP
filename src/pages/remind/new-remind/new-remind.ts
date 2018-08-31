import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';


@IonicPage()
@Component({
	selector: 'page-new-remind',
	templateUrl: 'new-remind.html'
})
export class NewRemindPage {
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public app: App
	) { }
	ionViewDidLoad() { }
	close() {
		this.viewCtrl.dismiss();
	}
	new(type) {
		this.app.getActiveNav().push('AddRemindPage', { type });
		this.close();
	}
}
