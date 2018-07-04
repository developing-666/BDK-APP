import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';



@Component({
    selector: 'page-remind',
    templateUrl: 'remind.html'
})
export class RemindPage {
    hideTabs: boolean = false;
    currentPage: number = 1;
    totalPages:number =1;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private event: Events
    ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad RemindPage');
    }
    delete() {
        if (this.hideTabs) {
            this.event.publish('showTabs');
        } else {
            this.event.publish('hideTabs');
        }
        this.hideTabs = !this.hideTabs;
    }
    doRefresh(e) {
        console.log(e);
    }
    loadMore(e) {
        console.log(e);
    }
}
