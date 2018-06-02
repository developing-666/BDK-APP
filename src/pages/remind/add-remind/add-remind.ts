import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { IonInputPanelComponent }from '../../../components/ion-input-panel/ion-input-panel'


@Component({
    selector: 'page-add-remind',
    templateUrl: 'add-remind.html'
})
export class AddRemindPage {
    @ViewChild(IonInputPanelComponent) inputPanel: IonInputPanelComponent;
    constructor(public navCtrl: NavController, public navParams: NavParams) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddRemindPage');
    }
    add() {}
    openInputPanel() {
        this.inputPanel.open();
    }
}
