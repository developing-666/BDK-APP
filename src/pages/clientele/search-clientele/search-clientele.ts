import { Component,ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController,Searchbar } from 'ionic-angular';


import { AppApi } from './../../../providers/app-api';
@IonicPage()
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
    ionViewWillEnter(){
        this.keywords = '';
        this.loaded = false;
        this.results = [];
    }
    ionViewDidEnter() {
		
        setTimeout(() => {
            this.searchbar.setFocus();
        }, 200);
    }
    onInput(e) {
        console.log(e);
        if (e.data) {
            let keywords = this.keywords.replace(/(^\s*)|(\s*$)/g, '');
            console.log(keywords);
            this.search(keywords);
        }else{
            this.loaded = false;
        }
    }
    onCancel(e) {
        console.log(e);
        this.navCtrl.pop();
    }
    search(keywords) {
        this.appApi.customerSearch(keywords).subscribe(d => {
            console.log(d);
            this.loaded = true;
            this.results = d;
        });
    }
    itemTap(name) {
        this.navCtrl.push('SearchResultPage', {
            name,
            type:'search'
        });
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
	add() {
		this.navCtrl.push('AddClientelePage', {
			type: 'add'
		});
	}
}
