import { Utils } from './../../../providers/utils';
import { Component, ViewChild, ElementRef } from '@angular/core';
import {
	NavController,
	NavParams,
	Events,
	App,
	List,
	ModalController,
	AlertController,
	ToastController,
	Content,
	Platform
} from 'ionic-angular';


import { AppApi } from '../../../providers/app-api';
import { NativeService } from '../../../providers/native-service';
import { GlobalData } from '../../../providers/global-data';
import { ISFOLLOW, ISCOMMENT, FOLLOWSTATUS, } from '../../../providers/constants';

import moment from 'moment';
import { CalendarComponentOptions, DayConfig } from 'ion2-calendar';
@Component({
	selector: 'page-remind',
	templateUrl: 'remind.html'
})
export class RemindPage {
	@ViewChild('scrollContainer') scrollContainer: Content;
	@ViewChild('filterPanel') filterPanel: ElementRef;
	@ViewChild(List) list: List;
	isCompany: boolean = this.globalData.user.type == 'COMPANY';
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
		if(!this.isCompany){
			this.queryTaskCountByDate(this.currentMonth);
		}
	};
	draging: boolean = false;
	addBtnStyle: any = {};
	filterOpts: any = {
		isFollow: ISFOLLOW,
		isComment: ISCOMMENT,
		followStatus: FOLLOWSTATUS,
	}
	filterValues: any = {
		isFollow: {
			value: undefined,
			label: '全部'
		},
		followStatus: {
			value: undefined,
			label: '全部用户'
		},
		isComment: {
			value: undefined,
			label: '全部'
		},
	}
	openPanel: boolean = false;
	showBack: boolean = false;
	backIn: boolean = false;
	filterLayout: string = '';
	queryParams: any = {
		queryFetchCustomer: true,
		queryPlanRemindTimeStart: this.isCompany ? this.activeDay.value : undefined,
		queryPlanRemindTimeEnd: this.isCompany ? this.activeDay.value : undefined,
	}
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private events: Events,
		public app: App,
		public modalCtrl: ModalController,
		public appApi: AppApi,
		public alertCtrl: AlertController,
		public toastCtrl: ToastController,
		public nativeService: NativeService,
		public plt: Platform,
		public globalData: GlobalData
	) { }

	ionViewDidLoad() {
		this.events.subscribe('remind:create', this.update);
		this.events.subscribe('user:modalLogin', this.update);
		this.events.subscribe('followRecord:update', this.update);
		this.events.subscribe('delay:update', this.update);
		this.events.subscribe('remind:postil', this.update);
        this.getData();
		if(!this.isCompany){
			this.queryTaskCountByDate(this.currentMonth);
		}else{
            this.panelHide();
        }
	}
	ionViewWillUnload() {
		this.events.unsubscribe('remind:create', this.update);
		this.events.unsubscribe('user:modalLogin', this.update);
		this.events.unsubscribe('followRecord:update', this.update);
		this.events.unsubscribe('delay:update', this.update);
		this.events.unsubscribe('remind:postil', this.update);
	}
	foldCalendar() {
		this.fold = !this.fold;
	}
	getData(e?: any) {
		this.appApi
			.queryTaskDetailByPage({
				currentPageIndex: this.currentPage,
				orderBy: 'ASC',
				params: this.queryParams
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
	wantDelete() {
		if (this.hideTabs) {
			this.events.publish('showTabs');
		} else {
			this.events.publish('hideTabs');
		}
		this.hideTabs = !this.hideTabs;
	}
	doRefresh(e) {
		this.currentPage = 1;
		this.getData(e);
	}
	loadMore(e) {
		this.getData(e);
	}
	add() {
		let profileModal = this.modalCtrl.create('NewRemindPage');
		profileModal.present();
	}
	change() {
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
				this.app.getRootNav().push('SettingRecordPage', {
					followId: item.currFollowId
				});
			} else {
				this.app.getRootNav().push('SettingRecordPage', {
					remind: item
				});
			}
		}
	}
	itemPostil() {
		this.list.closeSlidingItems();
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
	press(e) {
		e.preventDefault();
		this.draging = true;
	}
	touchmove(e) {
		if (this.draging) {
			this.addBtnStyle = {
				top: (e.changedTouches[0].pageY - 25) + 'px',
				left: (e.changedTouches[0].pageX - 25) + 'px',
				bottom: 'auto',
				right: 'auto'
			}
		}
	}
	touchend() {
		this.draging = false;
	}
	filterPanelToggle(t) {
		if (this.openPanel) {
			if (this.filterLayout == t) {
				this.filterPanelClose();
			} else {
				this.filterLayout = t;
			}
		} else {
			this.filterPanelOpen(t);
		}
	}
	filterPanelOpen(t) {
		console.log(t)
		this.filterLayout = t;
		this.showBack = true;
		setTimeout(() => {
			this.openPanel = true;
			this.backIn = true;
		}, 0);
	}
	filterPanelClose() {
		this.openPanel = false;
		this.backIn = false;
		setTimeout(() => {
			this.showBack = false;
		}, 200);
	}
	filterItemTap(t, item) {
		this.filterValues[t] = item;
		this.filterPanelClose();
	}
	panelHide() {
		this.filterPanel.nativeElement.addEventListener(
			Utils.transitionEnd(),
			e => {
				if (e && e.propertyName == 'transform' && !this.openPanel) {
					let tmpParams = Utils.extend(true, {}, this.queryParams);
					tmpParams.queryUnFollow = this.filterValues.isFollow.value;
					tmpParams.queryUnComment = this.filterValues.isComment.value;
					tmpParams.queryCustomerFollowStatus = this.filterValues.followStatus.value;
					if (JSON.stringify(tmpParams) != JSON.stringify(this.queryParams)) {
						this.queryParams = tmpParams;
						this.currentPage = 1;
						this.getData();
					}
				}
			},
			false
		);
	}
}
