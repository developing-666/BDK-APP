import { Component, Output, EventEmitter, OnInit, ApplicationRef } from '@angular/core';
import { Platform } from 'ionic-angular';

import { Keyboard } from '@ionic-native/keyboard';
import { Media, MediaObject } from '@ionic-native/media';
import { FileTransfer, FileUploadOptions, FileTransferObject, FileUploadResult } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { NativeService } from '../../providers/native-service';
import { Utils } from '../../providers/utils';
@Component({
	selector: 'ion-input-panel',
	templateUrl: 'ion-input-panel.html'
})
export class IonInputPanelComponent implements OnInit {
	@Output() textInput: EventEmitter<any> = new EventEmitter();
	@Output() recordInput: EventEmitter<any> = new EventEmitter();
	@Output() deleteClick: EventEmitter<any> = new EventEmitter();
	@Output() playClick: EventEmitter<any> = new EventEmitter();
	isRecord: boolean = false;
	panelOpen: boolean = false;
	complete: boolean = false;
	seconds: number = 0;
	clock: any = null;
	recording: boolean = false;
	playing: boolean = false;
	keyboardHeight: number = 0;
	panelStyle: any = {};
	keyboardShow: any = null;
	keyboardHide: any = null;
	fileName: string = '';
	mediaObj: MediaObject = null;
	status: string = '';
	constructor(
		public platform: Platform,
		private applicationRef: ApplicationRef,
		private keyboard: Keyboard,
		public media: Media,
		public ft: FileTransfer,
		private file: File,
		private nativeService: NativeService
	) {
		console.log('Hello IonInputPanelComponent Component');
	}
	ngOnInit() {
		this.keyboardShow = this.keyboard.onKeyboardShow().subscribe((e) => {
			this.keyboardHeight = e.keyboardHeight;
			this.panelStyle = {
				transform: `translateY(-${e.keyboardHeight}px)`
			}
			this.applicationRef.tick();
		});
		this.keyboardHide = this.keyboard.onKeyboardHide().subscribe((e) => {
			this.panelStyle = {};
			this.applicationRef.tick();
		});
	}
	ngOnDestroy() {
		this.keyboardShow.unsubscribe();
		this.keyboardHide.unsubscribe();
	}
	open() {
		this.panelOpen = !this.panelOpen;
	}
	text(e) {
		this.isRecord = false;
		this.textInput.emit(e);
	}
	inputFoucs() {
		this.isRecord = false;
		this.panelOpen = true;
	}
	record(e) {
		this.isRecord = true;
		this.panelOpen = true;
		this.recordInput.emit(e);
	}
	play(e) {
		this.playClick.emit(e);
		if (this.playing) {
			this.mediaObj.stop();
		} else {
			this.mediaObj.play();
		}
		this.playing = !this.playing;
	}
	delete(e) {
		this.complete = false;
		this.deleteClick.emit(e);
	}
	clockStart() {
		if (this.nativeService.isMobile()) {
			this.seconds = 0;
			this.recording = true;
			console.log('seconds' + this.seconds);
			// this.clock = setInterval(() => {
			// 	this.seconds++;
			// 	console.log(this.seconds);
			// }, 1000);
			this.startRecording();
		} else {
			this.nativeService.alert('Not cordova!');
			return;
		}
	}
	clockStop() {
		this.recording = false;
		// clearInterval(this.clock);
		// if (this.seconds<2){
		//     alert('录音时间太短');
		//
		// }else{
		//     this.complete = true;
		// }
		this.mediaObj.stopRecord();
	}

	//录音
	startRecording() {
		this.fileName = Utils.uuid() + '.wav';
		if (this.platform.is('ios')) {
			this.file.createFile(this.file.documentsDirectory, this.fileName, true).then(() => {
				this.mediaObj = this.media.create(this.file.documentsDirectory.replace(/^file:\/\//, '') + this.fileName);
				this.doRecord(this.mediaObj);
			});
		} else if (this.platform.is('android')) {
			this.mediaObj = this.media.create(this.fileName);
			this.doRecord(this.mediaObj);
		}
	}
	doRecord(mediaObj: MediaObject) {
		// 开始录音
		mediaObj.startRecord();

		// 监测录音状态的回调
		mediaObj.onStatusUpdate.subscribe(status => this.showRecordStatus(status));

		// 录音成功后的处理，如上传录音
		mediaObj.onSuccess.subscribe(() => {
			this.recordSuccess(mediaObj);
		});

		// 录音失败后的处理，如提示错误码
		mediaObj.onError.subscribe(error => this.nativeService.alert('Record fail! Error: ' + error));

		// 设置录音的长度，单位毫秒，ios / android 均有效
		window.setTimeout(() => {
			if (this.status == 'Running') {
				mediaObj.stopRecord();
			}
		}, 60 * 1000);
	}
	recordSuccess(mediaObj: MediaObject) {
		this.seconds = mediaObj.getDuration();
		this.complete = true;
		this.applicationRef.tick();
		console.log('seconds' + this.seconds);
		console.log(this.file.documentsDirectory.replace(/^file:\/\//, '') + this.fileName);
	}

	// 根据录音状态码返回录音状态的方法
	showRecordStatus(status) {
		var statusStr = '';
		switch (status) {
			case 0:
				statusStr = 'None';
				break;
			case 1:
				statusStr = 'Start';
				break;
			case 2:
				statusStr = 'Running';
				break;
			case 3:
				statusStr = 'Paused';
				break;
			case 4:
				statusStr = 'Stopped';
				break;
			default:
				statusStr = 'None';
		};
		this.status = statusStr;
		console.log('status: ' + statusStr);
	}


}
