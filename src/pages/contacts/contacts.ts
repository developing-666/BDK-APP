import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Contacts, ContactFindOptions, ContactFieldType } from '@ionic-native/contacts';

// import * as pinyin from 'pinyin';
// import {pinyin} from '../../providers/pinyin';
//

import { Pinyin } from '../../providers/pinyinUtil';

@Component({
	selector: 'page-contacts',
	templateUrl: 'contacts.html'
})
export class ContactsPage {
	allContacts: Array<any> = [];//未按首字母顺序分组格式化后的数据
	formatContacts: any = [];  //按首字母顺序格式化后的数据
	// pinyinConfig: any = {
	// 	style: pinyin.STYLE_NORMAL, // 设置拼音风格
	// 	heteronym: true ,
	// 	segment: true
	// }
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private contacts: Contacts,
		private pinyin :Pinyin
	) { }

	ionViewDidLoad() {
		console.log('ionViewDidLoad ContactsPage');
		// this.getAllContacts();
		// console.log(pinyin('席文琦', this.pinyinConfig));
		console.log(this.pinyin.getPinyin('席文琦'));
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
			console.log(result[0]);
			// this.allContacts = result;
			this.formatData(result);
		});
	}
	formatData(d: any) {
		this.formatContacts = d.map(item => {
			let obj: any = item._objectInstance;
			let displayName: string = obj.displayName
				? obj.displayName
				: (obj.name && obj.name.formatted)
					? obj.name.formatted : '';
			return {
				displayName: displayName,
				phoneNumber: obj.phoneNumbers,
				// pinyinName: pinyin(displayName)
			}
		})
	}
}
