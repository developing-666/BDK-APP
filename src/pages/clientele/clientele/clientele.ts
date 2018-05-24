import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'page-clientele',
	templateUrl: 'clientele.html',
})
export class ClientelePage {
	opts:Array<any> = [
		{
			val:1,
			name:'测试1'
		},
		{
			val:2,
			name:'测试2'
		},
		{
			val:3,
			name:'测试3'
		}
	];
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
		console.log(this.opts);
	}
	open():void{
		this.openSelect = !this.openSelect;
	}
}