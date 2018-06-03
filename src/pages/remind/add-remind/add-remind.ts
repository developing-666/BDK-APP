import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { IonInputPanelComponent }from '../../../components/ion-input-panel/ion-input-panel';
import { InfoInputComponent } from '../../../components/info-input/info-input';


@Component({
    selector: 'page-add-remind',
    templateUrl: 'add-remind.html'
})
export class AddRemindPage {
    @ViewChild(InfoInputComponent) infoInput: InfoInputComponent;
    @ViewChild(IonInputPanelComponent) inputPanel: IonInputPanelComponent;
    constructor(public navCtrl: NavController, public navParams: NavParams) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddRemindPage');
    }
    add() {}
    openInputPanel() {
        this.inputPanel.inputFoucs();
    }
    hideInputPanel() {
        this.inputPanel.panelOpen = false;
    }
	textInput(){
		this.infoInput.isRecord = false;
		setTimeout(()=>{
			this.infoInput.setFocus();
		},200);
	}
	recordInput(){
		this.infoInput.isRecord = true;
	}
}
