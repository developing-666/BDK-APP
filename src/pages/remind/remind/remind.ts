import { Utils } from './../../../providers/utils';
import { Component, ViewChild } from '@angular/core';
import {
    NavController,
    NavParams,
    Events,
    App,
    List,
    ModalController,
    AlertController,
    ToastController,
    Content
} from 'ionic-angular';

import { NewRemindPage } from '../new-remind/new-remind';
import { SettingRecordPage } from '../../clientele/setting-record/setting-record';

import { AppApi } from '../../../providers/app-api';
import { NativeService } from '../../../providers/native-service';
import { LocalNotifications } from '@ionic-native/local-notifications';

import moment from 'moment';
import { CalendarComponentOptions, DayConfig } from 'ion2-calendar';
@Component({
    selector: 'page-remind',
    templateUrl: 'remind.html'
})
export class RemindPage {
    @ViewChild('scrollContainer') scrollContainer: Content;
    @ViewChild(List) list: List;
    fold: boolean = true;
    hideTabs: boolean = false;
    isHasNext: boolean = false;
    currentPage: number = 1;
    deleteIds: Array<string> = [];
    startDay: Date = moment('2018-01-01').toDate();
    today: number = moment().valueOf();
    currentMonth: string = moment()
        .startOf('month')
        .format('YYYY-MM-DD');
    activeDay: any = {
        display: moment().format('MM月DD日'),
        value: moment().format('YYYY-MM-DD')
    };
    reminds: Array<any> = [];
    notificationData: Array<any> = [];
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
    update: any = () => {
        this.currentPage = 1;
        this.scrollContainer.scrollToTop(0);
        setTimeout(() => {
            this.getData();
        }, 0);
        this.queryTaskCountByDate(this.currentMonth);
    };
	draging:boolean = false;
	addBtnStyle:any = {};
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private events: Events,
        public app: App,
        public modalCtrl: ModalController,
        public appApi: AppApi,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController,
        private localNotifications: LocalNotifications,
        public nativeService: NativeService
    ) {}

    ionViewDidLoad() {
        this.events.subscribe('remind:create', this.update);
        this.events.subscribe('followRecord:update', this.update);
        this.events.subscribe('delay:update', this.update);
        this.getData();
        this.queryTaskCountByDate(this.currentMonth);
    }
    ionViewWillUnload() {
        this.events.unsubscribe('remind:create', this.update);
        this.events.unsubscribe('followRecord:update', this.update);
        this.events.unsubscribe('delay:update', this.update);
    }
    foldCalendar() {
        this.fold = !this.fold;
    }
    getData(e?: any) {
        this.appApi
            .queryTaskDetailByPage({
                currentPageIndex: this.currentPage,
                orderBy: 'ASC',
                params: {
                    // queryUnFollow:true,
                    queryFetchCustomer: true,
                    queryPlanRemindTimeStart: this.activeDay.value,
                    queryPlanRemindTimeEnd: this.activeDay.value
                }
            })
            .subscribe(
                d => {
                    this.isHasNext = d.isHasNext;
                    if (this.currentPage === 1) {
                        this.reminds = d.items;
                    } else {
                        this.reminds = this.reminds.concat(d.items);
                    }
                    setTimeout(() => {
                        this.currentPage++;
                    }, 0);
                    //if(this.nativeService.isMobile()){
                    // this.getNotificationData();
                    //}
                    if (e) {
                        setTimeout(() => {
                            e.complete();
                        }, 200);
                    }
                },
                err => {
                    if (e) {
                        setTimeout(() => {
                            e.complete();
                        }, 200);
                    }
                }
            );
    }
    // getNotificationData() {
    // 	if (this.reminds.length == 0) return;
    // 	let arr: Array<any> = [];
    // 	for (let item of this.reminds) {
    // 		if (!item.isExpired) {
    // 			arr.push(item);
    // 		}
    // 	}
    // 	if (arr.length == 0) return;
    // 	for (let item of arr) {
    // 		let time = moment(item.planRemindTime).valueOf();
    // 		this.notificationData.push({
    // 			id: item.id,
    // 			title: item.title,
    // 			text: item.content,
    // 			sound: this.nativeService.isAndroid() ? 'file://sound.mp3' : 'file://beep.caf',
    // 			data: { secret: '5666' },
    // 			trigger: { at: new Date(time)},
    // 		})
    // 	};
    // 	this.setNotification();
    //
    // }
    // setNotification() {
    // 	this.localNotifications.clearAll().then(() => {
    // 		this.localNotifications.schedule(this.notificationData);
    // 	}).catch(() => {
    // 		this.nativeService.alert('本地通知清除错误');
    // 	})
    // }
    wantDelete() {
        if (this.hideTabs) {
            this.events.publish('showTabs');
        } else {
            this.events.publish('hideTabs');
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
        this.getData(e);
    }
    add() {
        let profileModal = this.modalCtrl.create(NewRemindPage);
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
        this.currentMonth = m.newMonth.string;
        this.queryTaskCountByDate(this.currentMonth);
    }
    queryTaskCountByDate(m) {
        this.appApi
            .queryTaskCountByDate({
                startDate: m,
                endDate: moment(m)
                    .endOf('month')
                    .format('YYYY-MM-DD')
            })
            .subscribe(d => {
                console.log(d);
                this.daysConfig(d);
            });
    }
    daysConfig(d) {
        let daysConfig: DayConfig[] = [];
        if (d.length > 0) {
            for (const day of d) {
                daysConfig.push({
                    date: moment(day.date).toDate(),
                    marked: true
                });
            }
        }
        this.calendarOpt = Utils.extend(true, {}, this.calendarOpt, {
            daysConfig
        });
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
    itemClick(item) {
        if (this.hideTabs) {
            let index = this.deleteIds.indexOf(item.id);
            if (index > -1) {
                this.deleteIds.splice(index, 1);
            } else {
                this.deleteIds.push(item.id);
            }
        } else {
            if (item.isDone) {
                this.app.getRootNav().push(SettingRecordPage, {
                    followId: item.currFollowId
                });
            } else {
                this.app.getRootNav().push(SettingRecordPage, {
                    remind: item
                });
            }
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
        console.log(this.deleteIds);
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
                                this.events.publish('showTabs');
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
	press(e){
		e.preventDefault();
		this.draging = true;
		console.log(123123123)
	}
	touchmove(e){
		if (this.draging) {
		    this.addBtnStyle = {
				top:(e.changedTouches[0].pageY - 25)+'px',
				left:(e.changedTouches[0].pageX - 25)+'px',
				bottom:'auto',
				right:'auto'
			}
			console.log()
		}
	}
}
