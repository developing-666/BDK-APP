import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActionSheetController } from 'ionic-angular';

import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Keyboard } from '@ionic-native/keyboard';


import { Utils } from '../../providers/utils';
@Component({
	selector: 'info-input',
	templateUrl: 'info-input.html',
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: InfoInputComponent, multi: true }
	],
})
export class InfoInputComponent implements ControlValueAccessor {
	@ViewChild('remarkInput') remarkInput: ElementRef;
	@Output() inputFoucs: EventEmitter<any> = new EventEmitter();
	@Output() inputBlur: EventEmitter<any> = new EventEmitter();
	@Output() voiceBarClick: EventEmitter<any> = new EventEmitter();
	@Input() id: string;
	@Input() name: string;
	@Input() placeholder: string = '点击输入提醒文字备注或语音备注.';
	changed: any = [];
	touched: any = [];
	disabled: boolean = false;
	isRecord: boolean = false;
	inputValue: string = '';
	innerValue: any = {};
	textareaStyle: any = {};
	get value(): any {
		return this.innerValue;
	}
	set value(value: any) {
		if (this.innerValue !== value) {
			this.innerValue = value;
			this.changed.forEach(f => f(value));
		}
	}
	blankClick: any = (e) => {
		let parent = Utils.closest(e.target, '.remark-container') || Utils.closest(e.target, '.ion-input-panel');
		if (!parent) {
			this.inputBlur.emit(e);
		}
	}
	constructor(
		private camera: Camera,
		private imagePicker: ImagePicker,
		private keyboard: Keyboard,
		public actionSheetCtrl: ActionSheetController
	) { }
	ngOnInit() {
		document.addEventListener('touchstart', this.blankClick, false);
	}
	ngOnDestroy() {
		document.removeEventListener('touchstart', this.blankClick, false);
	}
	valueInit() {
		console.log(this.value)
		this.value = {
			desc: {
				type: 'text',
				detail: this.inputValue
			},
			imgList: []
		};
		console.log(this.value)
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
		if (this.value.desc == undefined) {
			this.valueInit();
		};
		console.log(this.value);
		this.value.desc.detail = this.inputValue;
		this.textareaStyle = {
			'height': `${this.remarkInput.nativeElement.scrollHeight}px`
		}
	}
	setBlur() {
		this.remarkInput.nativeElement.blur();
	}
	setFocus() {
		this.remarkInput.nativeElement.focus();
		// this.keyboard.show();
	}
	pickerPhoto() {
		let count = 9 - this.innerValue.imgList.length;
		if (count === 0 || count < 0) {
			alert('最多添加9张图片');
			return false;
		};
		console.log(count);
		const options: ImagePickerOptions = {
			maximumImagesCount: count,
			quality: 50,
			outputType: 1
		};
		this.imagePicker.getPictures(options).then((results) => {
			if (this.value.desc == undefined) {
				this.valueInit();
			};
			for (let item of results) {
				if (this.value.imgList.indexOf('data:image/jpeg;base64,' + item) == -1) {
					this.value.imgList.push('data:image/jpeg;base64,' + item);
				}
			}
		}, (err) => {
			// alert('获取图片失败,请重试');
		});
	}
	takePicture() {
		const imgOptions: CameraOptions = {
			quality: 50,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			saveToPhotoAlbum: true
		};
		this.camera.getPicture(imgOptions).then((imageUrl) => {
			// 获取成功
			if (this.value.desc == undefined) {
				this.valueInit();
			};
			let base64Image = 'data:image/jpeg;base64,' + imageUrl;
			if (this.value.imgList.indexOf(base64Image) == -1) {
				this.value.imgList.push(base64Image);
			}
			this.value.imgList.push(base64Image);
		}, (err) => {
			// alert('获取图片失败,请重试');
		});
	}
	chooseImage() {
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
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});
		actionSheet.present();
	}
	deleteImg(i) {
		this.innerValue.imgList.splice(i, 1);
	}
	voiceBarTap(e) {
		console.log(e);
		this.voiceBarClick.emit(e);
	}


	// custom-form-item
	registerOnChange(fn: any): void {
		this.changed.push(fn);
	}
	registerOnTouched(fn: any): void {
		this.touched.push(fn);
	}
	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}
	writeValue(obj: string): void {
		this.innerValue = obj;
	}
}
