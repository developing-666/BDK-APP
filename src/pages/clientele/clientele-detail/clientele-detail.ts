import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OperatingRecordPage } from './tabs/operating-record/operating-record';



import { AppApi } from './../../../providers/app-api';
@Component({
    selector: 'page-clientele-detail',
    templateUrl: 'clientele-detail.html'
})
export class ClienteleDetailPage {
    tabPage = OperatingRecordPage;
    id: string = this.navParams.get('id');
    clienteleDetail:any = {};
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private appApi: AppApi
    ) {}

    ionViewDidLoad() {
        this.customerDetails();
    }
    customerDetails() {
        this.appApi.customerDetails(this.id).subscribe(d => {
            console.log(d);
            this.clienteleDetail = d;
        });
    }
}