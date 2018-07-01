import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { AddClientelePage } from '../add-clientele/add-clientele';
import { SearchClientelePage } from '../search-clientele/search-clientele';

import { AppApi } from './../../../providers/app-api';
import { Utils } from '../../../providers/utils';


@Component({
    selector: 'page-clientele',
    templateUrl: 'clientele.html'
})
export class ClientelePage {
    initQueryParams: any = {
        params: {
            queryLabel: '',
            queryKeyword: '',
            queryCustomLabel: '',
            queryFollowStatus: ''
        },
        sort: '',
        orderBy: 'DESC'
    };
    queryParams: any = {
        params: {
            queryLabel: '',
            queryKeyword: '',
            queryCustomLabel: '',
            queryFollowStatus: ''
        },
        sort: '',
        orderBy: 'DESC'
    };
    currentPage: number = 1;
    totalPages: number = 0;
    clienteles: Array<any> = [];
    value: string = '';
    openSelect: Boolean = false;
    selectOptions: any = {
        cssClass: 'full-selector'
    };
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private appApi: AppApi
    ) {}
    ionViewDidLoad() {
        this.customerQuery(this.initQueryParams);
    }
    add() {
        let callback = (refresh): any => {
            console.log(refresh);
            if (refresh) {
                this.customerQuery(this.initQueryParams);
            }
            return Promise.resolve();
        };
        this.navCtrl.push(AddClientelePage, { callback });
    }
    search() {
        this.navCtrl.push(SearchClientelePage);
    }
    open(): void {
        this.openSelect = !this.openSelect;
    }
    filterHide(v) {
        let tmpQueryParams = Utils.extend(true, {}, this.initQueryParams);
        tmpQueryParams.params.queryLabel = v[0].value[0].value;
        tmpQueryParams.params.queryCustomLabel = v[0].value[1].value.join(',');
        tmpQueryParams.params.queryFollowStatus = v[1].value ? v[1].value : '';
        tmpQueryParams.sort = v[2].value ? v[2].value : '';
        if (
            JSON.stringify(tmpQueryParams) != JSON.stringify(this.queryParams)
        ) {
            this.queryParams = tmpQueryParams;
            this.customerQuery(this.queryParams);
        }
    }
    customerQuery(queryParams, e?: any) {
        this.appApi
            .customerQuery({
                currentPageIndex: this.currentPage,
                ...queryParams
            })
            .subscribe(d => {
                this.clienteles = d.items;
                this.totalPages = d.totalPages;
                this.currentPage++;
                console.log(e);
                e || e.complete();
            });
    }
    itemDelete(i) {
        this.appApi.customerDelete(i).subscribe(d => {
            console.log(i);
            this.currentPage = 1;
            this.customerQuery(this.initQueryParams);
        });
    }
    itemRemind(i) {
        console.log(i);
    }
    loadMore(e) {
        console.log(e);
        this.customerQuery(this.queryParams, e);
    }
    doRefresh(e){
        this.currentPage = 1;
        this.customerQuery(this.initQueryParams, e);
    }
}
