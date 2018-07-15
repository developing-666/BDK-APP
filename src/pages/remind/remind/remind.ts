import { Component, ViewChild } from '@angular/core';
import {
    NavController,
    NavParams,
    Events,
    App,
    List,
    ModalController,
    AlertController,
    ToastController
} from 'ionic-angular';

import { NewRemindPage } from '../new-remind/new-remind';
import { SettingRecordPage}from '../../clientele/setting-record/setting-record';

import { AppApi } from '../../../providers/app-api';

import moment from 'moment';
import { CalendarComponentOptions } from 'ion2-calendar';
@Component({
    selector: 'page-remind',
    templateUrl: 'remind.html'
})
export class RemindPage {
    @ViewChild(List) list: List;
    fold: boolean = true;
    hideTabs: boolean = false;
    currentPage: number = 1;
    totalPages: number = 1;
    deleteIds: Array<string> = [];
    startDay: Date = moment('2018-01-01').toDate();
    today: number = moment().valueOf();
    activeDay: any = {
        display: moment().format('MM月DD日'),
        value: moment().format('YYYY-MM-DD')
    };
    reminds: Array<any> = [];
    calendarOpt: CalendarComponentOptions = {
        from: this.startDay,
        monthFormat: 'YYYY 年 MM 月 ',
        weekdays: ['日', '一', '二', '三', '四', '五', '六'],
        monthPickerFormat: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
        ]
    };
    prevDayDisabled: boolean = false;
    nextDayDisabled: boolean = false;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private event: Events,
        public app: App,
        public modalCtrl: ModalController,
        public appApi: AppApi,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController
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
					queryFetchCustomer:true,
                    queryPlanRemindTimeStart: this.activeDay.value,
                    queryPlanRemindTimeEnd: this.activeDay.value
                }
            })
            .subscribe(d => {
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
            },err=>{
				console.log(err);
				if (e) {
                    setTimeout(() => {
                        e.complete();
                    }, 200);
                }
			});
    }
    wantDelete() {
        if (this.hideTabs) {
            this.event.publish('showTabs');
        } else {
            this.event.publish('hideTabs');
        }
        this.hideTabs = !this.hideTabs;
    }
    doRefresh(e) {
        console.log(e);
        this.currentPage = 1;
        this.getData(e);
    }
    loadMore(e) {
        console.log(e);
    }
    add() {
        let refresh: any = () => {
            this.currentPage = 1;
            this.getData();
            return Promise.resolve();
        };
        let profileModal = this.modalCtrl.create(NewRemindPage, {
            refresh
        });
        profileModal.present();
    }
    change() {
        console.log(this.activeDay);
        this.currentPage = 1;
        this.getData();
    }
    dayChange(d) {
        this.activeDay = {
            display: moment(d).format('MM月DD日'),
            value: d
        };
        if (moment(d).isSame(this.startDay)) {
            this.prevDayDisabled = true;
        }
        this.change();
    }
    monthChange(m) {
        console.log(m);
    }
    prevDay() {
        if (this.prevDayDisabled) return;
        let day = moment(this.activeDay.value).subtract(1, 'days');
        if (day.isSame(this.startDay)) {
            this.prevDayDisabled = true;
        }
        this.activeDay = {
            display: day.format('MM月DD日'),
            value: day.format('YYYY-MM-DD')
        };
        this.change();
    }
    nextDay() {
        if (this.prevDayDisabled) {
            this.prevDayDisabled = false;
        }
        let day = moment(this.activeDay.value).add(1, 'days');
        this.activeDay = {
            display: day.format('MM月DD日'),
            value: day.format('YYYY-MM-DD')
        };
        this.change();
    }
    goToady() {
        if (
            !moment(this.activeDay.value).isSame(moment().format('YYYY-MM-DD'))
        ) {
            this.activeDay = {
                display: moment().format('MM月DD日'),
                value: moment().format('YYYY-MM-DD')
            };
            this.change();
        }
    }
    delete(item) {
        this.reminds.splice(item.index, 1);
    }
    goDelay() {
        this.list.closeSlidingItems();
    }
    delay(item) {
        this.change();
    }
    itemClick(item) {
        if (this.hideTabs) {
            let index = this.deleteIds.indexOf(item.id);
            if (index > -1) {
                this.deleteIds.splice(index, 1);
            } else {
                this.deleteIds.push(item.id);
            }
        } else {
			let refresh: any = () => {
	            this.currentPage = 1;
	            this.getData();
	            return Promise.resolve();
	        };
            this.app.getRootNav()
                .push(SettingRecordPage, {
                    remind: item
                });
        }
    }
    selectAll() {
        if (this.deleteIds.length < this.reminds.length) {
            for (let item of this.reminds) {
                let index = this.deleteIds.indexOf(item.id);
                if (index == -1) {
                    this.deleteIds.push(item.id);
                }
            }
        } else {
            this.deleteIds = [];
        }
    }
    deleteBatch() {
        let alert = this.alertCtrl.create({
            title: '确认删除所有?',
            buttons: [
                {
                    text: '取消',
                    role: 'cancel'
                },
                {
                    text: '确认',
                    handler: () => {
                        this.appApi
                            .taskDeleteBatch(this.deleteIds)
                            .subscribe(d => {
								this.change();
                                this.deleteSuccess();
								this.hideTabs = false;
								this.deleteIds = [];
                            });
                    }
                }
            ]
        });
        alert.present();
    }
    deleteSuccess() {
        const toast = this.toastCtrl.create({
            message: '删除成功',
            position: 'middle',
            duration: 1500
        });
        toast.present();
    }
}
