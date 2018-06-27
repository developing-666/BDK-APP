import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { AppApi } from './../../../providers/app-api';
@Component({
    selector: 'page-search-clientele',
    templateUrl: 'search-clientele.html'
})
export class SearchClientelePage {
    callback: any = this.navParams.get('callback');
    keywords: string = '';
    results: Array<any> = [];
    loaded: boolean = false;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private appApi: AppApi
    ) {}
    ionViewDidLoad() {
        console.log('ionViewDidLoad SearchClientelePage');
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
}