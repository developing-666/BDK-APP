import { Component } from '@angular/core';
import {
    NavController,
    NavParams,
    Events,
    App,
    ModalController
} from 'ionic-angular';
import moment from 'moment';

import { NewRemindPage } from '../new-remind/new-remind';

import { AppApi } from '../../../providers/app-api';

import { CalendarComponentOptions } from 'ion2-calendar';
@Component({
    selector: 'page-remind',
    templateUrl: 'remind.html'
})
export class RemindPage {
    fold:boolean = true;
    blur: boolean = false;
    hideTabs: boolean = false;
    currentPage: number = 1;
    totalPages: number = 1;
    activeDay: string = moment().format('YYYY-MM-DD');
    reminds: Array<any> = [];
    weekdays: Array<string> = ['日', '一', '二', '三', '四', '五', '六'];
    calendarOpt: CalendarComponentOptions = {
        from: moment('2018-01-01').toDate(),
        monthFormat: 'YYYY 年 MM 月 ',
        weekdays: this.weekdays
    };
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private event: Events,
        public app: App,
        public modalCtrl: ModalController,
        public appApi: AppApi
    ) {}

    ionViewDidLoad() {
        this.getData();
    }
    foldCalendar() {
        this.fold = !this.fold;
    }
    getData(e?: any) {
        this.appApi
            .queryTaskDetailByPage({
                currentPageIndex: this.currentPage,
                params: {
                    queryPlanRemindTimeStart: this.activeDay,
                    queryPlanRemindTimeEnd: this.activeDay
                }
            })
            .subscribe(d => {
                console.log(d);
                if (this.currentPage == 1) {
                    this.reminds = d.items;
                } else {
                    this.reminds = this.reminds.concat(d.items);
                }
                this.totalPages = d.totalPages;
                this.currentPage++;
                if (e) {
                    setTimeout(() => {
                        e.complete();
                    }, 200);
                }
            });
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
        this.getData(e);
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
        let refresh = (): any => {
            return Promise.resolve();
        };

        let profileModal = this.modalCtrl.create(NewRemindPage, {
            callback,
            refresh
        });
        profileModal.present();
    }
    dayChange() {}
    monthChange(m) {
        console.log(m);
    }
}
