import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { NativeService } from '../../../providers/native-service';
import { LoginPage } from '../login/login';

/**
 * Generated class for the GuidePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-guide',
  templateUrl: 'guide.html',
})
export class GuidePage {

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private nativeService: NativeService,
      private storage: Storage,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuidePage');
    this.nativeService.statusBarStyle('#f0faf4',true); // 设置状态栏颜色
  }

  start() {
      this.navCtrl.setRoot(LoginPage);
      this.storage.set('notFirstOpen',true);
  }

}
