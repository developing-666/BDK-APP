import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppApi } from '../../../../../providers/app-api';
@IonicPage()
@Component({
    selector: 'page-operating-record',
    templateUrl: 'operating-record.html'
})
export class OperatingRecordPage {
    currentPage: number = 1;
    id: string = this.navParams.get('id');
    record: Array<any> = [];
	isHasNext: boolean = false;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public appApi: AppApi
    ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad OperatingRecordPage');
        this.queryCustomerOperateLogByPage();
    }
    queryCustomerOperateLogByPage(e?: any) {
        this.appApi
            .queryCustomerOperateLogByPage({
                currentPageIndex: this.currentPage,
                params: {
                    queryCustomerId: this.id
                }
            })
            .subscribe(
                d => {
                    console.log(d);
					this.isHasNext = d.isHasNext;
                    if (this.currentPage == 1) {
                        this.record = d.items;
                    } else {
                        this.record = this.record.concat(d.items);
                    }
					setTimeout(() => {
						this.currentPage++;
					}, 0);
                    if (e) {
                        setTimeout(() => {
                            e.complete();
                        }, 200);
                    }
                },
                err => {
                    console.log(err);
                    if (e) {
                        setTimeout(() => {
                            e.complete();
                        }, 200);
                    }
                }
            );
    }
    doRefresh(e) {
        this.currentPage = 1;
        this.queryCustomerOperateLogByPage(e);
    }
    loadMore(e) {
        this.queryCustomerOperateLogByPage(e);
    }
}
