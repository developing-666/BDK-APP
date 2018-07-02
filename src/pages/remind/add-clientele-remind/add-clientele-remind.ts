import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-add-clientele-remind',
    templateUrl: 'add-clientele-remind.html'
})
export class AddClienteleRemindPage {
    item:any = this.navParams.get('item');
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {}

    ionViewDidLoad() {
        console.log(this.item);
    }
}