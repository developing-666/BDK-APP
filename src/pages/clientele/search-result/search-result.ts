import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddClientelePage } from '../add-clientele/add-clientele';

import { AppApi } from './../../../providers/app-api';
@Component({
    selector: 'page-search-result',
    templateUrl: 'search-result.html'
})
export class SearchResultPage {
    queryParams: any = {
        params: {
            queryLabel: '',
            queryKeyword: this.navParams.get('name'),
            queryCustomLabel: '',
            queryFollowStatus: ''
        },
        sort: '',
        orderBy: 'DESC'
    };
    currentPage: number = 1;
    totalPages: number = 0;
    clienteles: Array<any> = [];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private appApi: AppApi
    ) {}
    ionViewDidLoad() {
        console.log('ionViewDidLoad SearchResultPage');
        this.customerQuery(this.queryParams);
    }
    customerQuery(queryParams, e?: any) {
        this.appApi
            .customerQuery({
                currentPageIndex: this.currentPage,
                ...queryParams
            })
            .subscribe(d => {
                if (this.currentPage == 1) {
                    this.clienteles = d.items;
                } else {
                    this.clienteles = this.clienteles.concat(d.items);
                }
                this.totalPages = d.totalPages;
                this.currentPage++;
                if (e) {
                    setTimeout(() => {
                        e.complete();
                    }, 200);
                }
            });
    }
    itemDelete(item) {
        this.appApi.customerDelete(item.id).subscribe(d => {
            // this.currentPage = 1;
            this.clienteles.splice(item.index, 1);
        });
    }
    itemRemind(i) {
        console.log(i);
    }
    loadMore(e) {
        console.log(e);
        this.customerQuery(this.queryParams, e);
    }
}
