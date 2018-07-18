import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NativeService } from '../../../providers/native-service';

/**
 * Generated class for the UserAgreementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-agreement',
  templateUrl: 'user-agreement.html',
})
export class UserAgreementPage {

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private nativeService: NativeService,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserAgreementPage');
    this.nativeService.statusBarStyle(); // 设置状态栏颜色
  }

}
