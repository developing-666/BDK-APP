import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, List, App, Events, Content } from 'ionic-angular';

import { AddClienteleRemindPage } from '../../../../remind/add-clientele-remind/add-clientele-remind';

import { AddRemindPage } from '../../../../remind/add-remind/add-remind';

import { AppApi } from '../../../../../providers/app-api';
@Component({
    selector: 'page-not-follow',
    templateUrl: 'not-follow.html'
})
export class NotFollowPage {
    @ViewChild(Content) content: Content;
    @ViewChild(List) list: List;
    currentPage: number = 1;
    totalPages: number = 1;
    id: string = this.navParams.get('id');
    item: any = this.navParams.get('item');
    reminds: Array<any> = [];
    update: any = id => {
        console.log(id);
        if (this.id === id) {
            this.currentPage = 1;
            this.content.scrollToTop(0);
            setTimeout(() => {
                this.queryTaskDetailByPage();
            }, 0);
        }
    };
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public appApi: AppApi,
        public app: App,
        private events: Events
    ) {}

    ionViewDidLoad() {
        this.queryTaskDetailByPage();
        this.events.subscribe('remind:create', this.update);
        this.events.subscribe('followRecord:update', this.update);
        this.events.subscribe('delay:update', this.update);
    }
    ionViewWillUnload() {
        this.events.unsubscribe('remind:create', this.update);
        this.events.unsubscribe('followRecord:update', this.update);
        this.events.unsubscribe('delay:update', this.update);
    }
    queryTaskDetailByPage(e?: any) {
        this.appApi
            .queryTaskDetailByPage({
                currentPageIndex: this.currentPage,
                params: {
                    queryUnFollow: true,
                    queryFetchCustomer: true,
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
    delete(item) {
        this.reminds.splice(item.index, 1);
    }
    goDelay() {
        this.list.closeSlidingItems();
    }
    delay(item) {
        this.currentPage = 1;
        this.queryTaskDetailByPage();
    }
    doRefresh(e) {
        console.log(e);
        this.currentPage = 1;
        this.queryTaskDetailByPage(e);
    }
    loadMore(e) {
        console.log(e);
    }
    itemClick(item) {
        this.app.getRootNav().push(AddRemindPage, {
            item,
            mode: 'delay',
            type: item.customerId ? 'clientele' : 'other'
        });
    }
    add() {
        let callback = (done): any => {
            console.log(done);
            // if (done) {
            // 	this.currentPage = 1;
            //     this.queryTaskDetailByPage();
            // }
            return Promise.resolve();
        };
        this.app.getRootNav().push(AddClienteleRemindPage, {
            item: this.item
        });
    }
}
