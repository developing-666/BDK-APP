import { Component } from '@angular/core';
import {
    NavController,
    NavParams,
    Events,
    App,
    ModalController
} from 'ionic-angular';

import { NewRemindPage } from '../new-remind/new-remind';
import { SearchResultPage } from '../../clientele/search-result/search-result';
@Component({
    selector: 'page-remind',
    templateUrl: 'remind.html'
})
export class RemindPage {
    blur:boolean = false;
    hideTabs: boolean = false;
    currentPage: number = 1;
    totalPages: number = 1;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private event: Events,
        public app: App,
        public modalCtrl: ModalController
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
    add() {
        let callback = (d): any => {
            console.log(d);
            
            this.blur = d;
            return Promise.resolve();
        };
        let profileModal = this.modalCtrl.create(NewRemindPage, {
            callback
        });
        profileModal.present();
    }
}
