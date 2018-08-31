import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams,ToastController,Events, } from 'ionic-angular';

import { AppApi } from '../../../providers/app-api';
import { NativeService } from '../../../providers/native-service';

import { Observable } from 'rxjs/Rx';
@IonicPage()
@Component({
	selector: 'page-remind-postil',
	templateUrl: 'remind-postil.html',
})
export class RemindPostilPage {
	@ViewChild('postilForm') postilForm: NgForm;
	remind: any = this.navParams.get('remind');
	paths: Array<any> = [];
	comment:any;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appApi: AppApi,
		public nativeService: NativeService,
		public toastCtrl: ToastController,
		private events: Events,
	) { }

	ionViewDidLoad() {
		console.log('ionViewDidLoad PostilPage');
	}
	taskCommentCreate() {
		this.appApi.taskCommentCreate({
			taskId:this.remind.id,
			comment:this.comment.content
		}).subscribe(d => {
			this.events.publish('remind:postil');
			this.success();
		});
	}
	success() {
		const toast = this.toastCtrl.create({
			message: '批注成功',
			position: 'middle',
			duration: 1500
		});
		toast.onDidDismiss(() => {
			this.navCtrl.pop();
		});
		toast.present();
	}
	done(){
		if (this.postilForm.valid) {
			this.taskCommentCreate();
		}
	}
	upoadImage(): Observable<any> {
		return Observable.create(observer => {
			this.paths = [];
			if (!this.comment || !this.comment.pics || this.comment.pics.length == 0) {
				observer.next(true);
			} else {
				const imgHttp: Array<Observable<any>> = [];
				for (let data of this.comment.pics) {
					imgHttp.push(
						this.appApi.upoadImage({
							data,
							type: 'TASK'
						})
					);
				}
				const result = Observable.combineLatest(...imgHttp);
				result.subscribe(
					d => {
						if (d.length == this.comment.pics.length) {
							for (let item of d) {
								this.paths.push(item.path);
							}
							observer.next(true);
						}
					},
					e => {
						console.log(e);
						this.nativeService.alert('图片上传失败,请重试');
					}
				);
			}
		});
	}
}
