import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { NativeService } from '../../../providers/native-service';
import { Helper } from '../../../providers/helper';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
	selector: 'page-guide',
	templateUrl: 'guide.html'
})
export class GuidePage {
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private nativeService: NativeService,
		private storage: Storage,
		private helper: Helper
	) { }

	ionViewDidLoad() {
		this.nativeService.statusBarStyle('#f0faf4', true); // 设置状态栏颜色
		this.helper.setTags(['BDK_NOLOGIN']);
	}

	start() {
		this.navCtrl.setRoot(LoginPage);
		this.storage.set('notFirstOpen', true);
	}
}
