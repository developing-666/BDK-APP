import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, List } from 'ionic-angular';


import { AppApi } from '../../../../../providers/app-api';
@Component({
    selector: 'page-not-follow',
    templateUrl: 'not-follow.html'
})
export class NotFollowPage {
    @ViewChild(List) list: List;
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
        this.queryTaskDetailByPage();
    }
    queryTaskDetailByPage(e?: any) {
        this.appApi
            .queryTaskDetailByPage({
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
    itemClick(e, item){
        e.stopPropagation();
        e.preventDefault();
        
    }
}
