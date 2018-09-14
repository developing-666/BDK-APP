import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { CardIO } from '@ionic-native/card-io';

import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

@Component({
	selector: 'page-ionic-demo',
	templateUrl: 'ionic-demo.html',
})
export class IonicDemoPage {
	cameraPreviewOpts: CameraPreviewOptions = {
		x: 0,
		y: 0,
		width: window.screen.width,
		height: window.screen.height,
		camera: 'rear',
		tapPhoto: true,
		previewDrag: true,
		toBack: true,
		alpha: 1
	};
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private cardIO: CardIO,
		private cameraPreview: CameraPreview
	) { }

	ionViewDidLoad() {
		console.log('window');
	}
	startCamera() {
		this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
			(res) => {
				console.log(res);
				this.cameraPreview.show();
			},
			(err) => {
				console.log(err)
			});
		// CameraPreview.startCamera({x: 50, y: 50, width: 300, height: 300, toBack: false, previewDrag: true, tapPhoto: true});
	}
	bankCard() {
		this.cardIO.canScan()
			.then(
				(res: boolean) => {
					if (res) {
						let options = {
							requireExpiry: true,
							requireCVV: false,
							requirePostalCode: false
						};
						this.cardIO.scan(options).then(d => {
							console.log(d);
						});
					}
				}
			);
	}
}
