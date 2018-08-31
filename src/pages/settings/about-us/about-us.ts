import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpHeader } from '../../../providers/http-header';

@IonicPage()
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
