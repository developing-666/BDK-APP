import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActionSheetController } from 'ionic-angular';



import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Keyboard } from '@ionic-native/keyboard';

import { Utils } from '../../providers/utils';

import { AppApi } from '../../providers/app-api';


@Component({
	selector: 'info-input',
	templateUrl: 'info-input.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: InfoInputComponent,
			multi: true
		}
	]
})
export class InfoInputComponent implements ControlValueAccessor {
	@ViewChild('remarkInput') remarkInput: ElementRef;
	@Output() inputFoucs: EventEmitter<any> = new EventEmitter();
	@Output() inputBlur: EventEmitter<any> = new EventEmitter();
	@Output() voiceBarClick: EventEmitter<any> = new EventEmitter();
	@Input() placeholder: string = '点击输入提醒文字备注或语音备注.';
	@Input() id: string;
	@Input() name: string;
	@Input() type: string = 'task';
	change: any;
	changed: any = [];
	touched: any = [];
	disabled: boolean = false;
	isRecord: boolean = false;
	inputValue: string = undefined;
	innerValue: any = null;
	textareaStyle: any = {};
	get value(): any {
		if (this.innerValue.content || this.innerValue.audio) {
			return this.innerValue;
		} else {
			return undefined;
		}
	}
	set value(value: any) {
		if (this.innerValue !== value) {
			this.innerValue = value;
			this.changed.forEach(f => f(value));
		}
	}
	constructor(
		private camera: Camera,
		private imagePicker: ImagePicker,
		private keyboard: Keyboard,
		public actionSheetCtrl: ActionSheetController,
		private appApi: AppApi,
	) { }
	valueInit() {
		this.innerValue = {
			content: this.inputValue,
			audio: undefined,
			pics: []
		};
	}
	textareaFocus(e) {
		this.inputFoucs.emit(e);
		this.keyboard.hideKeyboardAccessoryBar(true);
		this.keyboard.disableScroll(true);
		console.log(e);
	}
	textareaBlur(e) {
		this.inputBlur.emit(e);
	}
	textareaInput() {
		if (!this.innerValue || !this.innerValue.content) {
			this.valueInit();
		}
		this.innerValue.content = this.inputValue;

		this.change(this.innerValue);
		this.textareaStyle = {
			height: `${this.remarkInput.nativeElement.scrollHeight}px`
		};
	}
	setBlur() {
		this.remarkInput.nativeElement.blur();
	}
	setFocus() {
		this.remarkInput.nativeElement.focus();
		// this.keyboard.show();
	}
	pickerPhoto() {
		if (!this.innerValue || !this.innerValue.content) {
			this.valueInit();
		}
		let count = 9 - this.innerValue.pics.length;
		if (count === 0 || count < 0) {
			alert('最多添加9张图片');
			return false;
		}
		console.log(count);
		const options: ImagePickerOptions = {
			maximumImagesCount: count,
			quality: 50,
			outputType: 1
		};
		this.imagePicker.getPictures(options).then(
			results => {
				for (let item of results) {
					if (
						this.innerValue.pics.indexOf(
							'data:image/jpg;base64,' + item
						) == -1
					) {
						this.innerValue.pics.push(
							'data:image/jpg;base64,' + item
						);
						this.change(this.innerValue);
					}
				}
			},
			err => {
				alert('获取图片失败,请重试');
			}
		);
	}
	takePicture() {
		if (!this.innerValue || !this.innerValue.content) {
			this.valueInit();
		}
		const imgOptions: CameraOptions = {
			quality: 50,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			saveToPhotoAlbum: true
		};
		this.camera.getPicture(imgOptions).then(
			imageUrl => {
				// 获取成功
				let base64Image = 'data:image/jpg;base64,' + imageUrl;
				if (this.innerValue.pics.indexOf(base64Image) == -1) {
					this.innerValue.pics.push(base64Image);
					this.change(this.innerValue);
				}
			},
			err => {
				alert('获取图片失败,请重试');
			}
		);
	}
	chooseImage() {
		if (this.disabled) return;
		let actionSheet = this.actionSheetCtrl.create({
			buttons: [
				{
					text: '相册',
					handler: () => {
						this.pickerPhoto();
					}
				},
				{
					text: '拍摄',
					handler: () => {
						this.takePicture();
					}
				},
				{
					text: '取消',
					role: 'cancel'
				}
			]
		});
		actionSheet.present();
	}
	deleteImg(i) {
		this.innerValue.pics.splice(i, 1);
		this.change(this.innerValue);
	}
	voiceBarTap(e) {
		console.log(e);
		this.voiceBarClick.emit(e);
	}
	// custom-form-item
	registerOnChange(fn: any): void {
		this.change = fn;
		this.changed.push(fn);
	}
	registerOnTouched(fn: any): void {
		this.touched.push(fn);
	}
	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}
	writeValue(obj: any): void {
		console.log(obj);
		this.innerValue = obj;
		this.inputValue = obj ? obj.content : '';
	}

}
