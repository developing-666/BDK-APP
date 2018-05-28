import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';



@Component({
	selector: 'page-custom-tag',
	templateUrl: 'custom-tag.html',
})
export class CustomTagPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public alertCtrl: AlertController
	) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CustomTagPage');
	}
	newTag() {
		let prompt = this.alertCtrl.create({
			title: '输入自定义标签',
			inputs: [
				{
					name: 'tag',
					placeholder: '请输入客户标签'
				},
			],
			buttons: [
				{
					text: '取消'
				},
				{
					text: '确定',
					handler: data => {
						console.log('Saved clicked');
					}
				}
			]
		});
		prompt.present();
	}
}
