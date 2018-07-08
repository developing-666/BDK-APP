import { Component, ViewChild, ApplicationRef } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";


import { IonInputPanelComponent } from '../../../components/ion-input-panel/ion-input-panel';
import { InfoInputComponent } from '../../../components/info-input/info-input';
@Component({
    selector: 'page-setting-record',
    templateUrl: 'setting-record.html'
})
export class SettingRecordPage {
    @ViewChild(InfoInputComponent) infoInput: InfoInputComponent;
    @ViewChild(IonInputPanelComponent) inputPanel: IonInputPanelComponent;
    placeholder: string = '点击输入跟进情况文字备注或语音备注';
    content: any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private applicationRef: ApplicationRef
    ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingRecordPage');
        this.inputPanel.scrollEnable();
    }
    openInputPanel() {
        this.inputPanel.inputFoucs();
    }
    hideInputPanel() {
        console.log('close');
        this.inputPanel.panelOpen = false;
        this.applicationRef.tick();
    }
    textInput() {
        this.infoInput.isRecord = false;
        setTimeout(() => {
            this.infoInput.setFocus();
        }, 200);
    }
    recordInput() {
        this.infoInput.isRecord = true;
    }
    voiceBarClick() {
        this.infoInput.isRecord = true;
        this.inputPanel.panelOpen = true;
    }
    recordEnd(e) {
        console.log(e);
    }

    setting() {}
}
