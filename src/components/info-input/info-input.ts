import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';

import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Keyboard } from '@ionic-native/keyboard';
@Component({
	selector: 'info-input',
	templateUrl: 'info-input.html'
})
export class InfoInputComponent {
	@ViewChild('remarkInput') remarkInput: ElementRef;
	@Output() inputFoucs: EventEmitter<any> = new EventEmitter();
	@Output() inputBlur: EventEmitter<any> = new EventEmitter();
	isRecord: boolean = false;
	constructor(
		private camera: Camera,
		private imagePicker: ImagePicker,
		private keyboard: Keyboard,
		public actionSheetCtrl: ActionSheetController
	) { }
	textareaFocus(e) {
		this.inputFoucs.emit(e);
		this.keyboard.hideKeyboardAccessoryBar(true);
		this.keyboard.disableScroll(true);
		console.log(e);
	}
	textareaBlur(e) {
		this.inputBlur.emit(e);
	}
	setBlur() {
		this.remarkInput.nativeElement.blur();
	}
	setFocus() {
		this.remarkInput.nativeElement.focus();
		// this.keyboard.show();
	}
	pickerPhoto() {
		const options: ImagePickerOptions = {
			maximumImagesCount: 9,
			quality: 100
		};
		this.imagePicker.getPictures(options).then((results) => {
			console.log(results);
		}, (err) => {
			alert('获取图片失败,请重试');
		});
	}
	takePicture() {
		const imgOptions: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			saveToPhotoAlbum: true
		};
		this.camera.getPicture(imgOptions).then((imageUrl) => {
			console.log(imageUrl);
			// 获取成功
			// let base64Image = 'data:image/jpeg;base64,' + imageData;
		}, (err) => {
			alert('获取图片失败,请重试');
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
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});
		actionSheet.present();
	}
}
