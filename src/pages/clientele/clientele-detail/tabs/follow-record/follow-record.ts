import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AppApi } from '../../../../../providers/app-api';

@Component({
    selector: 'page-follow-record',
    templateUrl: 'follow-record.html'
})
export class FollowRecordPage {
    currentPage: number = 1;
    totalPages: number = 1;
    id: string = this.navParams.get('id');
    reminds: Array<any> = [];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public appApi: AppApi
    ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad NotFollowPage');
        this.queryCustomerFollowDetailByPage();
    }
    queryCustomerFollowDetailByPage(e?: any) {
        this.appApi
            .queryCustomerFollowDetailByPage({
                currentPageIndex: 1,
                params: {
                    queryCustomerId: this.id
                }
            })
            .subscribe(
                d => {
                    console.log(d);
                    if (this.currentPage == 1) {
                        this.reminds = d.items;
                    } else {
                        this.reminds = this.reminds.concat(d.items);
                    }
                    this.totalPages = d.totalPages;
                    this.currentPage++;
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
        console.log(e);
        this.currentPage = 1;
        this.queryCustomerFollowDetailByPage(e);
    }
    loadMore(e) {
        console.log(e);
    }
    itemClick(e, item) {
        e.stopPropagation();
        e.preventDefault();
    }
}
