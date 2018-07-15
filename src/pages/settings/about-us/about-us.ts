import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HttpHeader } from '../../../providers/http-header';

/**
 * Generated class for the AboutUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-about-us',
    templateUrl: 'about-us.html'
})
export class AboutUsPage {
    version: String;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private httpHeader: HttpHeader
    ) {
        this.version = this.httpHeader.appVersion;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AboutUsPage');
    }
}
