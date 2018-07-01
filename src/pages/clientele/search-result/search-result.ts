import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


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
    customerQuery(queryParams) {
        this.appApi
            .customerQuery({
                currentPageIndex: this.currentPage,
                ...queryParams
            })
            .subscribe(d => {
                this.clienteles = d.items;
                console.log(this.clienteles);
            });
    }
    itemDelete(i) {
        this.appApi.customerDelete(i).subscribe(d => {
            console.log(i);
            this.currentPage = 1;
            this.customerQuery(this.queryParams);
        });
    }
    itemRemind(i) {
        console.log(i);
    }
}
