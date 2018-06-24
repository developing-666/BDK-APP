import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AppApi } from './../../../providers/app-api';

@Component({
    selector: 'page-clientele',
    templateUrl: 'clientele.html'
})
export class ClientelePage {
    queryParams: any = {
        queryLabel: '',
        sort: '',
        orderBy: '',
        currentPageIndex: 1
    };
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
        this.customerQuery();
    }
    open(): void {
        this.openSelect = !this.openSelect;
    }
    filterHide(v) {
        console.log(v);
    }
    customerQuery() {
        this.appApi.customerQuery(this.queryParams).subscribe(d => {
            console.log(d);
        });
    }
}
