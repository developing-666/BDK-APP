import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { AddClientelePage } from '../add-clientele/add-clientele';

import { AppApi } from './../../../providers/app-api';

@Component({
    selector: 'page-clientele',
    templateUrl: 'clientele.html'
})
export class ClientelePage {
    initQueryParams: any = {
        params: {
            queryLabel: ''
        },
        sort: '',
        orderBy: 'DESC',
        currentPageIndex: 1
    };
    queryParams: any = {
        params: {
            queryLabel: ''
        },
        sort: '',
        orderBy: 'DESC',
        currentPageIndex: 1
    };
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
            if (refresh){
                this.customerQuery(this.initQueryParams);
            }
            return Promise.resolve();
        };
        this.navCtrl.push(AddClientelePage, { callback });
    }
    open(): void {
        this.openSelect = !this.openSelect;
    }
    filterHide(v) {
        console.log(v);
    }
    customerQuery(queryParams) {
        this.appApi.customerQuery(queryParams).subscribe(d => {
            this.clienteles = d.items;
            console.log(this.clienteles);
        });
    }
    itemDelete(i) {
        this.appApi.customerDelete(i).subscribe((d)=>{
            console.log(i);
            this.customerQuery(this.queryParams);
        });
    }
    itemRemind(i) {
        console.log(i);
    }
}
