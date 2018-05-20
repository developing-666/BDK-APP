import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }
  mushrooms: boolean = true;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

}
