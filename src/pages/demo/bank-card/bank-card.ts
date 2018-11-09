import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';


import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

import { XfyunApi } from '../../../providers/xfyun-api';
import { AppApi } from '../../../providers/app-api';
import { img } from '../../../providers/img';

import { Utils } from '../../../providers/utils';
@IonicPage()
@Component({
	selector: 'page-bank-card',
	templateUrl: 'bank-card.html',
})
export class BankCardPage {
	cameraPreviewOpts: CameraPreviewOptions = {
		x: 0,
		y: 44,
		width: 375,
		height: 200,
		camera: 'rear',
		tapPhoto: true,
		previewDrag: true,
		toBack: false,
		alpha: 1
	};
	loading: any;
	results: any;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private cameraPreview: CameraPreview,
		public loadingCtrl: LoadingController,
		private xfApi: XfyunApi,
		private appApi: AppApi,
	) { }
	ionViewDidLoad() {
		// this.presentLoading();
	}
	ionViewDidEnter() {
		console.log('ionViewDidLoad BankCardPage');
		// this.initCamera();
	}
	presentLoading() {
		this.loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		this.loading.present();
	}
	initCamera() {
		this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
			(res) => {
				console.log(res);
				this.loading.dismiss();
			},
			(err) => {
				console.log(err)
			});
	}
	bankCard() {
		this.appApi.ocrbankcard({
			'api_key':'o9kGGPipf3cK-GTomMBbaqZJ7yN7GYak',
			'api_secret':'xgnvtgfrb8ZIZrBrJaVJvnxS6B6_mkzG',
			'image_base64':img
		}).subscribe(d=>{
			console.log(d);
		})
	}
}
