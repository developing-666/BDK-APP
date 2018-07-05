import { Component, ViewChild, ApplicationRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, ModalController, Navbar } from 'ionic-angular';

import { IonInputPanelComponent } from '../../../components/ion-input-panel/ion-input-panel';
import { InfoInputComponent } from '../../../components/info-input/info-input';

import { ClientelePage } from '../../clientele/clientele/clientele';
import { SearchResultPage}from'../../clientele/search-result/search-result';

import { AppApi } from './../../../providers/app-api';
import { Utils } from '../../../providers/utils';
@Component({
    selector: 'page-add-remind',
    templateUrl: 'add-remind.html'
})
export class AddRemindPage {
    @ViewChild(Navbar) navBar: Navbar;
    @ViewChild('addRemindForm') addRemindForm: NgForm;
    @ViewChild(InfoInputComponent) infoInput: InfoInputComponent;
    @ViewChild(IonInputPanelComponent) inputPanel: IonInputPanelComponent;
    type: any = this.navParams.get('type');
    title: string = this.navParams.get('type') =='clientele'?'新增客户提醒':'其它提醒';
    clientele:any = undefined;
    content: any;
    formData: any = {
        customerId: undefined,
        title: undefined,
        planRemindTime: undefined
    };
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private applicationRef: ApplicationRef,
        private appApi: AppApi,
        public modalCtrl: ModalController
    ) {}

    ionViewDidLoad() {
        // this.navBar.backButtonClick = (e: UIEvent) => {
        //     // todo something
        //     this.callback().then(() => {
        //         this.navCtrl.pop();
        //     });
        // };
    }
    ionViewWillLeave() {
        console.log(123123123);
    }
    done() {
        if (this.addRemindForm.valid) {
            this.formData = Utils.extend(true, this.formData, this.content);
            this.formData.planRemindTime = this.formData.planRemindTime.replace(
                'Z',
                ''
            );
            this.formData.planRemindTime = this.formData.planRemindTime.replace(
                'T',
                ' '
            );
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
    choose() {
        let callback = (d): any => {
            console.log(d);

            return Promise.resolve();
        };
        let profileModal = this.modalCtrl.create(SearchResultPage, {
            item:this.clientele
        });
        profileModal.onDidDismiss(data => {
            this.inputPanel.scrollDisable();
            if(data){
                this.clientele = data;
            }
            console.log(data);
        });
        this.inputPanel.scrollEnable();
        profileModal.present();
    }
}
