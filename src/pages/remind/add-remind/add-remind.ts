import { Component, ViewChild, ApplicationRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
	IonicPage,
	NavController,
	NavParams,
	ModalController,
	ToastController,
	Events,
	ViewController
} from 'ionic-angular';
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
	selector: 'page-add-remind',
	templateUrl: 'add-remind.html'
})
export class AddRemindPage {
	@ViewChild('addRemindForm') addRemindForm: NgForm;
	@ViewChild(InfoInputComponent) infoInput: InfoInputComponent;
	@ViewChild(IonInputPanelComponent) inputPanel: IonInputPanelComponent;
	callback: any = this.navParams.get('callback');
	item: any = this.navParams.get('item');
	type: any = this.navParams.get('type');
	mode: string = this.navParams.get('mode');
	modeText: string = this.mode == 'delay' ? '延迟' : '新增';
	title: string =
		this.navParams.get('type') == 'clientele'
			? `${this.modeText}客户提醒`
			: `${this.modeText}其它提醒`;

	clientele: any = undefined;
	infoContent: any;
	formData: any = {
		title: undefined,
		planRemindTime: undefined
	};
	minTime = moment().format('YYYY-MM-DDTHH:mm:ssZ');
	planRemindTime = moment().format('YYYY-MM-DDTHH:mm:ssZ');
	paths: Array<any> = [];
	audio: any = {
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
		public modalCtrl: ModalController,
		public toastCtrl: ToastController,
		public nativeService: NativeService,
		public ft: FileTransfer,
		private globalData: GlobalData,
		private events: Events,
		public viewCtrl: ViewController
	) {
		if (this.item) {
			console.log(this.item);
			this.formData = {
				title: this.item.title
			};
			this.infoContent = {};
			this.infoContent.content = this.item.content
				? this.item.content
				: undefined;
			this.infoContent.pics = this.item.pics ? this.item.pics : undefined;
			this.infoContent.audio = this.item.audioPath
				? this.item.audioPath
				: undefined;
			console.log(this.infoContent);
			this.clientele = this.item.customer;
			this.planRemindTime = moment(this.item.planRemindTime).format(
				'YYYY-MM-DDTHH:mm:ssZ'
			);
		}
	}
	ionViewDidLoad() {
		this.nativeService.statusBarStyle(); // 设置状态栏颜色
		// this.nativeService.overlaysWebView(false);
		// this.navBar.backButtonClick = (e: UIEvent) => {
		//     // todo something
		//     this.callback().then(() => {
		//         this.navCtrl.pop();
		//     });
		// };
	}
	ionViewWillLeave() {
		// this.nativeService.overlaysWebView(true);
	}
	delay() {
		this.appApi
			.taskLazy({
				lazyId: this.item.id,
				planRemindTime: this.planRemindTime
			})
			.subscribe(d => {
				console.log(d);
				console.log(this.type);
				this.events.publish(
					'delay:update',
					this.type == 'clientele'
						? this.clientele.id
						: undefined
				);
				const toast = this.toastCtrl.create({
					message: '延迟成功',
					position: 'middle',
					duration: 1500
				});
				toast.onDidDismiss(() => {
					this.navCtrl.pop();
				});
				toast.present();
			});
	}
	done() {
		// this.uploadAudio();
		if (this.addRemindForm.valid) {
			const imgUpload = this.upoadImage();
			const audioUpload = this.uploadAudio();
			const result = Observable.combineLatest(imgUpload, audioUpload);
			result.subscribe(d => {
				if (d[0] && (d[1] === true || d[1].responseCode === 200)) {
					const audio =
						d[1] === true
							? undefined
							: JSON.parse(d[1].response).data;
					console.log(audio);
					if (this.type == 'clientele') {
						this.formData.customerId = this.clientele.id;
					}
					this.formData.content = this.infoContent?this.infoContent.content:undefined;
					if (audio) {
						this.formData.audio = {};
						this.formData.audio.path = audio
							? audio.path
							: undefined;
						this.formData.audio.duration = this.audio.duration;
					}
					this.formData.pics = this.paths;
					this.formData.planRemindTime = moment(this.planRemindTime)
						.utc()
						.format();
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
			if (!this.infoContent || !this.infoContent.pics || this.infoContent.pics.length == 0) {
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
				}
				const result = Observable.combineLatest(...imgHttp);
				result.subscribe(
					d => {
						if (d.length == this.infoContent.pics.length) {
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
				ftObj
					.upload(
						this.audio.audioUrl,
						encodeURI(APP_SERVE_URL + '/upoad/audio'),
						options
					)
					.then(
						d => {
							observer.next(d);
						},
						e => {
							this.nativeService.alert('语音上传失败,请重试');
						}
					);
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
		if (this.mode == 'delay') return;
		this.inputPanel.inputFoucs();
	}
	hideInputPanel() {
		if (this.mode == 'delay') return;
		this.inputPanel.panelOpen = false;
		this.applicationRef.tick();
		document.removeEventListener('touchstart', this.blankClick, false);
	}
	textInput() {
		if (this.mode == 'delay') return;
		this.infoInput.isRecord = false;
		setTimeout(() => {
			this.infoInput.setFocus();
		}, 200);
	}
	recordInput() {
		if (this.mode == 'delay') return;
		this.infoInput.isRecord = true;
		document.addEventListener('touchstart', this.blankClick, false);
		this.infoInput.setBlur();
	}
	voiceBarClick() {
		if (this.mode == 'delay') return;
		this.infoInput.isRecord = true;
		this.inputPanel.panelOpen = true;
	}
	recordEnd(e) {
		this.audio = {
			...this.audio,
			...e
		};
		if (!this.infoContent) {
			this.infoContent = {};
		}
		this.infoContent.audio = this.audio;
	}
	deleteClick() {
		this.audio = {
			type: 'TASK'
		};
		delete this.infoContent.audio;
		console.log(this.infoContent);
	}
	choose() {
		let callback = (d): any => {
			console.log(d);
			return Promise.resolve();
		};
		let profileModal = this.modalCtrl.create('SearchResultPage', {
			item: this.clientele
		});
		profileModal.onDidDismiss(data => {
			this.inputPanel.scrollDisable();
			if (data) {
				this.clientele = data;
			}
			console.log(data);
		});
		this.inputPanel.scrollEnable();
		profileModal.present();
	}
}
