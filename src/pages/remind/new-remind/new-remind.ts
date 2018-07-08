import { Component } from '@angular/core';
import {NavController, NavParams, ViewController,App } from 'ionic-angular';



import { AddRemindPage } from '../add-remind/add-remind';
@Component({
    selector: 'page-new-remind',
    templateUrl: 'new-remind.html'
})
export class NewRemindPage {
    refresh: any = this.navParams.get('refresh');
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public app: App
    ) {}
    ionViewDidLoad() {}
    close() {
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
