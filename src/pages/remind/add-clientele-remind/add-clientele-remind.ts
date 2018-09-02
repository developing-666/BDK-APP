import { Component, ViewChild, ApplicationRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage,NavController, NavParams, ToastController, Navbar,Events } from 'ionic-angular';
import moment from 'moment';

import { IonInputPanelComponent } from '../../../components/ion-input-panel/ion-input-panel';
import { InfoInputComponent } from '../../../components/info-input/info-input';


import {
	FileTransfer,
	FileUploadOptions,
	FileTransferObject,
} from '@ionic-native/file-transfer';
import { APP_SERVE_URL } from '../../../providers/constants';
import { GlobalData } from '../../../providers/global-data';
import { AppApi } from './../../../providers/app-api';
import { Utils } from '../../../providers/utils';
import { NativeService } from '../../../providers/native-service';

import { Observable } from 'rxjs/Rx';

@IonicPage()
@Component({
	selector: 'page-add-clientele-remind',
	templateUrl: 'add-clientele-remind.html'
})
export class AddClienteleRemindPage {
	@ViewChild(Navbar) navBar: Navbar;
	@ViewChild('addRemindForm') addRemindForm: NgForm;
	@ViewChild(InfoInputComponent) infoInput: InfoInputComponent;
	@ViewChild(IonInputPanelComponent) inputPanel: IonInputPanelComponent;
	callback: any = this.navParams.get('callback');
	item: any = this.navParams.get('item');
	mode: string = this.navParams.get('mode');
	clientele: any = undefined;
	infoContent: any;
	formData: any = {
		customerId: this.navParams.get('item').id,
		title: undefined,
		planRemindTime: undefined
    };
    minTime = moment().format('YYYY-MM-DDTHH:mm:ssZ');
	planRemindTime = moment().format('YYYY-MM-DDTHH:mm:ssZ');
	paths: Array<any> = [];
	audio: any = {
		// duration: 10,
		type: 'TASK'
	};
	blankClick: any = e => {
		let parent =
			Utils.closest(e.target, '.remark-container') ||
			Utils.closest(e.target, '.ion-input-panel');
		if (!parent) {
			this.hideInputPanel();
		}
	};
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private applicationRef: ApplicationRef,
		private appApi: AppApi,
		public toastCtrl: ToastController,
		public nativeService: NativeService,
		public ft: FileTransfer,
		private globalData: GlobalData,
        private events: Events,
	) { }
	ionViewDidLoad() {
		// this.navBar.backButtonClick = (e: UIEvent) => {
		// 	this.callback().then(() => {
		// 		this.navCtrl.pop();
		// 	});
		// };
	}
	done() {
		console.log(this.addRemindForm.valid);
		console.log(this.formData);
		console.log(this.infoContent);
		this.uploadAudio();
		if (this.addRemindForm.valid) {
			const imgUpload = this.upoadImage();
			const audioUpload = this.uploadAudio();
			const result = Observable.combineLatest(imgUpload, audioUpload);
			result.subscribe(d => {
				if (d[0] && (d[1] === true || d[1].responseCode === 200)) {
					const audio = d[1] === true ? undefined : JSON.parse(d[1].response).data;
					console.log(audio);
					this.formData.content = this.infoContent?this.infoContent.content:undefined;
					if (audio) {
						this.formData.audio = {}
						this.formData.audio.path = audio ? audio.path : undefined;
						this.formData.audio.duration = this.audio.duration;
					}
					this.formData.pics = this.paths;
					this.formData.planRemindTime = moment(this.planRemindTime).utc().format();
					console.log('formData======================');
					console.log(this.formData);
					this.taskCreate();
				}
			});
		}
	}
	upoadImage(): Observable<any> {
		return Observable.create(observer => {
			this.paths = [];
			if (!this.infoContent || !this.infoContent || !this.infoContent.pics || (this.infoContent.pics && this.infoContent.pics.length == 0)) {
				observer.next(true);
			} else {
				const imgHttp: Array<Observable<any>> = [];
				for (let data of this.infoContent.pics) {
					imgHttp.push(
						this.appApi.upoadImage({
							data,
							type: 'TASK'
						})
					);
				};
				const result = Observable.combineLatest(...imgHttp);
				result.subscribe(d => {
					if (d.length == this.infoContent.pics.length) {
						for (let item of d) {
							this.paths.push(item.path);
						};
						observer.next(true);
					}
				}, e => {
					console.log(e);
					this.nativeService.alert('图片上传失败,请重试');
				})
			}
		});
	}
	uploadAudio(): Observable<any> {
		return Observable.create(observer => {
			console.log(this.audio.audioUrl);
			if (!this.audio.audioUrl) {
				observer.next(true);
			} else {
				const header = this.globalData.header;
				let options: FileUploadOptions = {
					headers: {
						// 'Content-Type':'application/json; charset=UTF-8',
						'DAFU-APP-INFO': header.appInfo,
						'DAFU-REQUEST-TIME': header.requestTime,
						'DAFU-APP-SIGN': header.appSign,
						'DAFU-TOKEN': header.token
					},
					params: {
						type: 'TASK'
					},
					fileName: this.audio.fileName,
					mimeType: 'audio/x-m4a'
				};
				const ftObj: FileTransferObject = this.ft.create();
				ftObj.upload(this.audio.audioUrl,
					encodeURI(APP_SERVE_URL + '/upoad/audio'), options).then(
						(d) => {
							observer.next(d);
						},
						(e) => {
							this.nativeService.alert('语音上传失败,请重试');
						});
			}
		});
	}
	taskCreate() {
		this.appApi.taskCreate(this.formData).subscribe(d => {
			console.log(d);
			this.success();
            this.events.publish('remind:create', this.formData.customerId);
		});
	}
	success() {
		const toast = this.toastCtrl.create({
			message: '创建成功',
			position: 'middle',
			duration: 1500
		});
		toast.onDidDismiss(() => {
			this.navCtrl.pop();
		});
		toast.present();
	}
	openInputPanel() {
		this.inputPanel.inputFoucs();
	}
	hideInputPanel() {
		this.inputPanel.panelOpen = false;
		this.applicationRef.tick();
		document.removeEventListener('touchstart', this.blankClick, false);
	}
	textInput() {
		this.infoInput.isRecord = false;
		setTimeout(() => {
			this.infoInput.setFocus();
		}, 200);
	}
	recordInput() {
		this.infoInput.isRecord = true;
		document.addEventListener('touchstart', this.blankClick, false);
		this.infoInput.setBlur();
	}
	voiceBarClick() {
		this.infoInput.isRecord = true;
		this.inputPanel.panelOpen = true;
	}
	recordEnd(e) {
		this.audio = {
			...this.audio,
			...e
		};
		if (!this.infoContent) {
			this.infoContent = {}
		}
		this.infoContent.audio = this.audio;
		console.log(this.infoContent);
	}
}
