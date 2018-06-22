import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { GlobalData } from '../../../providers/global-data';

import { Utils } from '../../../providers/utils';
@Component({
    selector: 'page-add-clientele',
    templateUrl: 'add-clientele.html'
})
export class AddClientelePage {
    formData: any = {
        gender: 'M',
		arr:['666','777']
    };
    constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public globalData: GlobalData
	) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddClientelePage');
		let obj1 = {
			a:123,
			b:this.formData
		};
		let obj2 = {
			c:333
		}
		let obj = Utils.extend(true,{},obj1,obj2);
		console.log(obj);
		this.formData.arr[0] = '111';
		console.log(obj);

    }
    add() {
        console.log(this.formData);
    }
    addTag() {
        console.log(12313);
    }
    addCustomTag() {
        console.log(222);
    }
	queryProvinces(){
		if(this.globalData.province.length){

		}
	}
}
