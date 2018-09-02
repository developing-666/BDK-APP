import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { GlobalData } from '../../../providers/global-data';
import { AppApi } from '../../../providers/app-api';
@IonicPage()
@Component({
    selector: 'page-allot',
    templateUrl: 'allot.html'
})
export class AllotPage {
    item: any = this.navParams.get('item');
    tag: any = undefined;
    tags: Array<any> = [];
    deleteIng: boolean = false;
    deleteId: string = '';
    tmp: any = this.navParams.get('tag');
    currentPage: number = 1;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public appApi: AppApi,
        public globalData: GlobalData,
        private events: Events
    ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad ClienteleTagPage');
        this.queryUserByCompany();
    }
    selectTag(tag) {
        this.tag = tag;
    }
    queryUserByCompany() {
        this.appApi
            .queryUserByCompany({
                currentPageIndex: this.currentPage,
                pageSize: 100
            })
            .subscribe(d => {
                this.tags = d.items;
            });
    }
    customerAssign() {
        this.appApi
            .customerAssign({
                id: this.item.id,
                onwerId: this.tag.id
            })
            .subscribe(d => {
                console.log(d);
                this.navCtrl.pop();
                this.events.publish('clientele:assign', this.item.id);
            });
    }
}
