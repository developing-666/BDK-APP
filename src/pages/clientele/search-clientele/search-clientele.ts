import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController,Searchbar } from 'ionic-angular';

import { SearchResultPage}from '../search-result/search-result';

import { AppApi } from './../../../providers/app-api';
@Component({
    selector: 'page-search-clientele',
    templateUrl: 'search-clientele.html'
})
export class SearchClientelePage {
    @ViewChild('searchbar') searchbar: Searchbar;
    keywords: string = '';
    results: Array<any> = [];
    loaded: boolean = false;
    history: Array<any> = [];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private appApi: AppApi,
        private alertCtrl: AlertController
    ) {}
    ionViewDidLoad() {
        this.searchhistory();
    }
    ionViewDidEnter() {
        this.searchbar.setFocus();
    }
    onInput(e) {
        console.log(e);
        if (e.data) {
            console.log(this.keywords);
            this.search();
        }
    }
    onCancel(e) {
        console.log(e);
        this.navCtrl.pop();
    }
    search() {
        this.appApi.customerSearch(this.keywords).subscribe(d => {
            console.log(d);
            this.loaded = true;
            this.results = d;
        });
    }
    itemTap(name) {
        this.navCtrl.push(SearchResultPage, { name });
    }
    searchhistory() {
        this.appApi.searchhistory().subscribe(d => {
            this.history = d;
        });
    }
    clearHistory() {
        this.appApi.searchHistoryDelete().subscribe(d => {
            console.log(d);
            this.searchhistory();
        });
    }
    confirm() {
        let alert = this.alertCtrl.create({
            title: '确认清空搜索历史?',
            buttons: [
                {
                    text: '取消',
                    role: 'cancel'
                },
                {
                    text: '确认',
                    handler: () => {
                        console.log('Buy clicked');
                        this.clearHistory;
                    }
                }
            ]
        });
        alert.present();
    }
}