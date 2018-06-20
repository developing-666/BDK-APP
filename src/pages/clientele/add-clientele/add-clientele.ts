import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
    selector: 'page-add-clientele',
    templateUrl: 'add-clientele.html'
})
export class AddClientelePage {
    formData: any = {
        gender: 'M'
    };
    constructor(public navCtrl: NavController, public navParams: NavParams) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddClientelePage');
    }
    add() {
        console.log(this.formData);
    }
    addTag() {
        console.log(12313);
    }
    addCustomTag() {
        console.log(222);
    }
}
