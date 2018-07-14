import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HowToApplyPage } from '../how-to-apply/how-to-apply';

/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

    /** 
     * 跳转如何申请页面 
     */    
    toHowToApplyPage() {
        this.navCtrl.push(HowToApplyPage);
    }

}
