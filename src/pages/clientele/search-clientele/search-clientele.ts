import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController,Searchbar } from 'ionic-angular';


import { AppApi } from './../../../providers/app-api';
@Component({
    selector: 'page-search-clientele',
    templateUrl: 'search-clientele.html'
})
export class SearchClientelePage {
    @ViewChild('searchbar') searchbar: Searchbar;
    callback: any = this.navParams.get('callback');
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
        console.log('ionViewDidLoad SearchClientelePage');
        console.log(this.searchbar);
    }
    ionViewDidEnter() {
        this.searchhistory();
        console.log(123123123);
        
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
    itemTap(i) {
        this.callback(i).then(() => {
            this.navCtrl.pop();
        });
    }
    searchhistory() {
        this.appApi.searchhistory().subscribe(d => {
            this.history = d;
            setTimeout(() => {
                this.searchbar.setFocus();
            }, 300);
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