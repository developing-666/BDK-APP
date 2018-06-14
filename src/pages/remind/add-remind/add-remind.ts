import { Component, ViewChild,ApplicationRef} from '@angular/core';
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
	formData:any = {
		infoInput:{}
	}
    constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private applicationRef: ApplicationRef,
	) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddRemindPage');
    }
    add() {}
    openInputPanel() {
        this.inputPanel.inputFoucs();
    }
    hideInputPanel() {
		console.log('close');
        this.inputPanel.panelOpen = false;
		this.applicationRef.tick();
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
	voiceBarClick(){
		this.infoInput.isRecord = true;
		this.inputPanel.panelOpen = true;
	}
	recordEnd(e){
		console.log(e);
	}
}
