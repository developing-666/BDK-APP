import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'page-clientele',
	templateUrl: 'clientele.html',
})
export class ClientelePage {
	value:string = '';
	openSelect:Boolean = false;
	selectOptions:any = {
		cssClass:'full-selector'
	};
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
	) {}

	ionViewDidLoad() {
	}
	open():void{
		this.openSelect = !this.openSelect;
	}
}