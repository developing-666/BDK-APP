import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, App, Events, Content } from 'ionic-angular';

import { AppApi } from '../../../../../providers/app-api';

import { SettingRecordPage } from '../../../setting-record/setting-record';
@Component({
    selector: 'page-follow-record',
    templateUrl: 'follow-record.html'
})
export class FollowRecordPage {
    @ViewChild(Content) content: Content;
    currentPage: number = 1;
    totalPages: number = 1;
    id: string = this.navParams.get('id');
    record: Array<any> = [];
    update: any = () => {
        this.currentPage = 1;
        this.content.scrollToTop(0);
        setTimeout(() => {
            this.queryCustomerFollowDetailByPage();
        }, 0);
    };
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public appApi: AppApi,
        public app: App,
        public events: Events
    ) {}

    ionViewDidLoad() {
        this.queryCustomerFollowDetailByPage();
        this.events.subscribe('followRecord:update', this.update);
    }
    ionViewWillUnload() {
        this.events.unsubscribe('followRecord:update', this.update);
    }
    queryCustomerFollowDetailByPage(e?: any) {
        this.appApi
            .queryCustomerFollowDetailByPage({
                currentPageIndex: this.currentPage,
                params: {
                    queryCustomerId: this.id,
                    queryFetchOnwer: true
                }
            })
            .subscribe(
                d => {
                    if (this.currentPage == 1) {
                        this.record = d.items;
                    } else {
                        this.record = this.record.concat(d.items);
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
        this.queryCustomerFollowDetailByPage(e);
    }
    itemClick(item) {
        console.log(item);

        this.app.getRootNav().push(SettingRecordPage, {
            followId: item.id
        });
    }
    add() {
        this.app.getRootNav().push(SettingRecordPage, {
            customerId: this.id
        });
    }
}
