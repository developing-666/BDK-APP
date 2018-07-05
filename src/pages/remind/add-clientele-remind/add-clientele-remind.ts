import { Component, ViewChild, ApplicationRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, Navbar } from 'ionic-angular';
import moment  from 'moment';


import { IonInputPanelComponent } from '../../../components/ion-input-panel/ion-input-panel';
import { InfoInputComponent } from '../../../components/info-input/info-input';


import { AppApi } from './../../../providers/app-api';
import { Utils } from '../../../providers/utils';
@Component({
    selector: 'page-add-clientele-remind',
    templateUrl: 'add-clientele-remind.html'
})
export class AddClienteleRemindPage {
    @ViewChild(Navbar) navBar: Navbar;
    @ViewChild('addRemindForm') addRemindForm: NgForm;
    @ViewChild(InfoInputComponent) infoInput: InfoInputComponent;
    @ViewChild(IonInputPanelComponent) inputPanel: IonInputPanelComponent;
    callback: any = this.navParams.get('callback');
    content: any;
    formData: any = {
        customerId: this.navParams.get('item').id,
        title: undefined,
        planRemindTime: undefined
    };
	planRemindTime = moment().format('YYYY-MM-DDTHH:mm:ssZ');
    item: any = this.navParams.get('item');
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private applicationRef: ApplicationRef,
        private appApi: AppApi
    ) {}

    ionViewDidLoad() {
		console.log(moment().utc())
        console.log(this.item);
        this.navBar.backButtonClick = (e: UIEvent) => {
            // todo something
            this.callback().then(() => {
                this.navCtrl.pop();
            });
        };
    }
    done() {
        if (this.addRemindForm.valid) {
            this.formData = Utils.extend(true, this.formData, this.content);
			this.formData.planRemindTime = moment(this.planRemindTime).utc().format()
            console.log(this.formData);
            this.taskCreate();
        }
    }
    taskCreate() {
        this.appApi.taskCreate(this.formData).subscribe(d => {
            console.log(d);
        });
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
}
