import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Navbar } from 'ionic-angular';
import { OperatingRecordPage } from './tabs/operating-record/operating-record';

import { ClienteleItemComponent } from '../../../components/clientele-item/clientele-item';

import { AppApi } from './../../../providers/app-api';
@Component({
    selector: 'page-clientele-detail',
    templateUrl: 'clientele-detail.html'
})
export class ClienteleDetailPage {
    @ViewChild(Navbar) navBar: Navbar;
    @ViewChild(ClienteleItemComponent) clienteleItem: ClienteleItemComponent;
	tabParams:any = {
		id:this.navParams.get('id')
	};
    tabPage = OperatingRecordPage;
    id: string = this.navParams.get('id');
    clienteleDetail: any = {};
    tabStyle: any = undefined;
    hideItem:boolean = false;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private appApi: AppApi
    ) {}
    ionViewDidLoad() {
        this.customerDetails();
        this.queryCustomerFollowDetailByPage();
        this.queryTaskDetailByPage();
        this.navBar.backButtonClick = (e: UIEvent) => {
            // todo something
            this.navCtrl.pop({ // animate: false,
                animation: 'md-transition' });
        };
    }
    queryTaskDetailByPage() {
        this.appApi
            .queryTaskDetailByPage({
                currentPageIndex: 1,
                params: {
                    queryCustomerId: this.id
                }
            })
            .subscribe(d => {
                console.log(d);
            });
    }
    queryCustomerFollowDetailByPage() {
        this.appApi
            .queryCustomerFollowDetailByPage({
                currentPageIndex: 1,
                params: {
                    queryCustomerId: this.id
                }
            })
            .subscribe(d => {
                console.log(d);
            });
    }
    customerDetails() {
        this.appApi.customerDetails(this.id).subscribe(d => {
            console.log(d);
            this.clienteleDetail = d;
            setTimeout(() => {
                this.tabStyle = {
                    height: `calc(100% - ${this.clienteleItem.getHeight() /
                        10}rem`
                };
                console.log(this.tabStyle);
            }, 0);
        });
    }
}
