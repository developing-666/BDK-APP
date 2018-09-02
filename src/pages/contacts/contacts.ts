import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Content,Events } from 'ionic-angular';

import { Contacts, ContactFindOptions, ContactFieldType } from '@ionic-native/contacts';

import { NativeService } from '../../providers/native-service';
import { Pinyin } from '../../providers/pinyin';
import { OrderBy } from '../../pipes/order-by';
import allContacts from '../../assets/lib/contacts';
import * as AlloyTouch from 'alloytouch';
import * as _ from 'lodash';

@IonicPage()
@Component({
	selector: 'page-contacts',
	templateUrl: 'contacts.html'
})
export class ContactsPage {
	@ViewChild(Content) content: Content;
	@ViewChild('wrapper') wrapper: ElementRef;
	@ViewChild('list') list: ElementRef;
	@ViewChild('letterIndicatorEle') letterIndicatorEle: ElementRef;
	@ViewChild('sidebar') sidebar: ElementRef;
	person: any = this.navParams.get('person');
	sortedItems: any = [];
	alphabet: any = [];
	allContacts: Array<any> = allContacts;//未按首字母顺序分组格式化后的数据
	formatContacts: Array<any> = [];  //按首字母顺序格式化后的数据
	currentPageClass = this;
	sidebarTouch: any;
	alloyTouch: any;
	mainSwiper: any;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private contacts: Contacts,
		private pinyin: Pinyin,
		public alertCtrl: AlertController,
		private nativeService: NativeService,
		private orderBy: OrderBy,
		private elementRef: ElementRef,
		public events: Events
	) { }
	ionViewDidLoad() {
		if (this.nativeService.isMobile()) {
			this.getAllContacts();
		} else {
			this.formatContacts = this.allContacts.filter(d => {
				if (d) {
					return d;
				}
			});
			this.groupData();
			setTimeout(()=>{
				this.setTouchHandlers();
			},200);
			// let alert = this.alertCtrl.create({
			// 	title: '请在真机上使用通讯录功能',
			// 	buttons: ['OK']
			// });
			// alert.present();
		}
	}
	getAllContacts(): void {
		console.log('getAllContacts');
		let options: any = new ContactFindOptions();
		let fields: ContactFieldType[];
		fields = ['displayName', 'phoneNumbers'];
		options.filter = '';
		options.multiple = true;
		options.hasPhoneNumber = true;
		this.contacts.find(fields, options).then((result) => {
			console.log(result.length);
			// this.allContacts = result;
			this.formatData(result);
		});
	}
	formatData(d: any) {
		this.allContacts = d.map(item => {
			let obj: any = item._objectInstance;
			let displayName: string = obj.displayName
				? obj.displayName
				: (obj.name && obj.name.formatted)
					? obj.name.formatted : '';
			if (displayName) {
				let pinyin = this.pinyin.getPinyin(displayName);
				return {
					displayName: displayName,
					phoneNumber: obj.phoneNumbers,
					pinyinName: pinyin,
					initial: pinyin ? pinyin.substring(0, 1).toUpperCase() : '#'
				}
			} else {
				return null;
			}
		});
		this.formatContacts = this.allContacts.filter(d => {
			if (d) {
				return d;
			}
		});
		this.groupData();
		setTimeout(()=>{
			this.setTouchHandlers();
		},200);
	}
	groupData() {
		let sortedListData: Array<any> = this.orderBy.transform(_.orderBy(this.formatContacts, x => x.initial), ['initial']);
		let groupItems: any = _.groupBy(sortedListData, item => {
			let letter: any = _.get(item, 'initial');
			return letter.toUpperCase().charAt(0);
		});
		this.sortedItems = this.unwindGroup(groupItems);
		this.alphabet = this.iterateAlphabet(groupItems);
	}
	unwindGroup(groupItems: any): Array<any> {
		let result: Array<any> = [];
		for (let letter in groupItems) {
			// result = result.concat([{ isDivider: true, letter: letter }].concat(groupItems[letter]));
			result.push({
				letter, children: groupItems[letter]
			});
		}
		return result;
	}
	iterateAlphabet(alphabet: any): Array<any> {
		let str: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#';
		let result: Array<any> = [];
		for (let i = 0; i < str.length; i++) {
			let letter = str.charAt(i);
			result.push({ letter: letter, isExist: alphabet[letter] ? true : false });
		}
		return result;
	}
	setTouchHandlers() {
		// this.mainSwiper = new Swiper(this.wrapper.nativeElement, {
		// 	direction: 'vertical',
		// 	slidesPerView: 'auto',
		// 	freeMode: true,
		// 	freeModeMomentumVelocityRatio:0.3
		// });
		this.sidebarTouch = new AlloyTouch({
			touch: this.sidebar.nativeElement,//反馈触摸的dom
			vertical: true,//不必需，默认是true代表监听竖直方向touch
			target: this.sidebar.nativeElement, //运动的对象
			property: 'translateY',  //被运动的属性
			touchStart: () => {
				// this.alloyTouch.stop();
				this.wrapper.nativeElement.style['overflow-y'] = 'hidden';
			},
			touchMove: (evt) => {
				this.chooseEle(evt);
			},
			touchEnd: () => {
				this.letterIndicatorEle.nativeElement.style.display = 'none';
				this.wrapper.nativeElement.style['overflow-y'] = 'auto';
			},
			tap: (evt) => {
				this.chooseEle(evt);
			}
		});
		// Transform(this.list.nativeElement, true);
	}
	chooseEle(evt){
		let closestEle: any = evt.type == 'touchend' ? document.elementFromPoint(evt.changedTouches[0].pageX, evt.changedTouches[0].pageY) : document.elementFromPoint(evt.targetTouches[0].pageX, evt.targetTouches[0].pageY);
		if (closestEle && ['LI', 'A'].indexOf(closestEle.tagName) > -1) {
			let letter = closestEle.innerText;
			this.letterIndicatorEle.nativeElement.innerText = letter;
			this.letterIndicatorEle.nativeElement.style.display = 'flex';
			let letterDivider: any = this.elementRef.nativeElement.querySelector(`#scroll-letter-${letter}`);
			let letterTop: number = letterDivider.offsetTop;
			if (letterDivider) {
				// this.mainSwiper.setTransition(0);
				// this.mainSwiper.setTranslate(-letterTop);
				// this.content.scrollTo(0,letterTop,0);
				this.wrapper.nativeElement.scrollTop = letterTop;
				// this.alloyTouch.to(-letterTop < min ? min : -letterTop, 0);
			}
		}
	}
	touchEnd(){
		this.letterIndicatorEle.nativeElement.style.display = 'none';
		// this.wrapper.nativeElement.style['overflow-y'] = 'auto';
	}
	onItemClick(e) {
		this.events.publish('contacts:choose',e);
		this.navCtrl.pop();
	}
}
