import {
	Component,
	Output,
	EventEmitter,
	Input,
	ElementRef,
} from '@angular/core';

import {
	AlertController,
	NavController,
	NavParams,
	App,
	Events,
	ActionSheetController
} from 'ionic-angular';


import { NativeService } from '../../providers/native-service';
import { AppApi } from '../../providers/app-api';

import { GlobalData } from '../../providers/global-data';

@Component({
	selector: 'clientele-item',
	templateUrl: 'clientele-item.html'
})
export class ClienteleItemComponent {
	@Output()
	allot: EventEmitter<any> = new EventEmitter();
	@Output()
	remind: EventEmitter<any> = new EventEmitter();
	@Output()
	delete: EventEmitter<any> = new EventEmitter();
	@Output()
	details: EventEmitter<any> = new EventEmitter();
	@Input()
	noPush: boolean = false;
	@Input()
	detail: boolean = true;
	@Input()
	data: any = {};
	@Input()
	index: number = undefined;
	@Input()
	showOnwer: boolean = false;
	labels: Array<any> = this.data.labels ? this.data.labels : [];
	update: any = id => {
		if (this.data.id === id) {
			this.customerDetails();
		}
	};
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private alertCtrl: AlertController,
		private $el: ElementRef,
		private appApi: AppApi,
		public app: App,
		private nativeService: NativeService,
		public events: Events,
		public actionSheetCtrl: ActionSheetController,
		public globalData: GlobalData
	) { }
	ngOnInit() {
		this.events.subscribe('clientele:update', this.update);
		this.events.subscribe('clientele:assign', this.update);
	}
	ngOnDestroy() {
		this.events.unsubscribe('clientele:update', this.update);
		this.events.unsubscribe('clientele:assign', this.update);
	}
	presentConfirm(item: any) {
		let alert = this.alertCtrl.create({
			title: '确认删除？',
			buttons: [
				{
					text: '取消',
					role: 'cancel'
				},
				{
					text: '确认',
					handler: () => {
						this.appApi.customerDelete(item.id).subscribe(d => {
							this.delete.emit({
								...item,
								index: this.index
							});
						});
					}
				}
			]
		});
		alert.present();
	}
	itemRemind(item) {
		this.remind.emit(item);
		this.app.getRootNav().push('AddClienteleRemindPage', {
			item
		});
	}
	itemDelete(item) {
		this.presentConfirm(item);
	}
	itemClick(e, item) {
		e.stopPropagation();
		e.preventDefault();
		if (this.detail) {
			this.navCtrl.push(
				'ClienteleDetailPage',
				{
					id: item.id
				},
				{
					animation: 'md-transition'
				}
			);
		}
		this.details.emit(item);
	}
	choosePhone() {
		let auths =
			this.globalData.user &&
				this.globalData.user.auths &&
				this.globalData.user.auths.indexOf('ROLE_SHOW_PHONE') > -1
				? true
				: false;
		const reg = /^(\d{3})\d{4}(\d{4})$/;
		let phones: Array<any> = [
			{
				text: auths
					? this.data.phone
					: this.data.phone.toString().replace(reg, '$1****$2'),
				handler: () => {
					this.customerCall(this.data.phone);
				}
			}
		];
		for (const phone of this.data.phones) {
			phones.push({
				text: auths ? phone : phone.toString().replace(reg, '$1****$2'),
				handler: () => {
					this.customerCall(phone);
				}
			});
		}
		let actionSheet = this.actionSheetCtrl.create({
			buttons: [
				...phones,
				{
					text: '取消',
					role: 'cancel'
				}
			]
		});
		actionSheet.present();
	}
	message(e, p) {
		e.stopPropagation();
		e.preventDefault();
		this.nativeService.sendSMS(p);
		console.log(p);
	}
	phone(e) {
		e.stopPropagation();
		e.preventDefault();
		if (!this.data.phones || this.data.phones.length == 0) {
			this.customerCall(this.data.phone);
		} else {
			this.choosePhone();
		}
	}
	customerCall(phone) {
		this.appApi
			.customerCall({
				businessType: 'BDK_CUSTOMER',
				customerId: this.data.id,
				phone
			})
			.subscribe(d => {
				console.log(d);
				this.nativeService.callNumber(d);
			});
	}
	getHeight() {
		return this.$el.nativeElement.querySelector('.item-wrapper')
			.offsetHeight;
	}
	customerDetails() {
		this.appApi.customerDetails(this.data.id).subscribe(d => {
			console.log(d);
			this.data = d;
		});
	}
	goAllot(item) {
		this.allot.emit(item);
		this.app.getRootNav().push('AllotPage', {
			item
		});
	}
}
