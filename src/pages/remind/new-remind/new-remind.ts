import { Component } from '@angular/core';
import {NavController, NavParams, ViewController,App } from 'ionic-angular';



import { AddRemindPage } from '../add-remind/add-remind';
@Component({
    selector: 'page-new-remind',
    templateUrl: 'new-remind.html'
})
export class NewRemindPage {
    callback: any = this.navParams.get('callback');
    refresh: any = this.navParams.get('refresh');
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public app: App
    ) {}

    ionViewDidLoad() {}
    ionViewWillEnter() {
        this.callback(true);
    }
    close() {
        this.callback(false);
        this.viewCtrl.dismiss();
    }
    new(type) {
        this.app.getActiveNav().push(AddRemindPage, {
            refresh: this.refresh,
            type
        });
        this.close();
    }
}
