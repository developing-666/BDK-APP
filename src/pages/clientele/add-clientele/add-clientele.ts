import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { GlobalData } from '../../../providers/global-data';

@Component({
    selector: 'page-add-clientele',
    templateUrl: 'add-clientele.html'
})
export class AddClientelePage {
    formData: any = {
        gender: 'M'
    };
    constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public globalData: GlobalData
	) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddClientelePage');
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
