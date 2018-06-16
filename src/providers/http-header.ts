import { Injectable } from '@angular/core';

import { Utils } from './utils';
import { NativeService } from './native-service';
import { Device } from '@ionic-native/device';
@Injectable()
export class HttpHeader {
	private _appVersion:any = '';
	timestamp:string = '';
	get appVersion(): string {
		return this._appVersion;
	}

	set appVersion(value: string) {
		this._appVersion = value;
	}
	constructor(
		public nativeService: NativeService,
		private device:Device
	) {}
	browserVersion(){
		if(/Android (\d+\.\d+)/.test(window.navigator.userAgent)){
			return RegExp.$1;
		}else if(/Version\/(\d+\.\d+)/.test(window.navigator.userAgent)){
			return RegExp.$1;
		}else{
			return '';
		}
	}
	appInfo() {
		if (this.nativeService.isMobile()) {
			const deviceInfo = `
				devName=${this.device.manufacturer}
				&osType=${this.device.platform}
				&osVersion=${this.device.version}
				&appVersion=${this._appVersion}
				&browser=${window.navigator.userAgent}
				&uuid=${this.device.uuid}
			`;
			console.log(deviceInfo);
			return deviceInfo;
		} else {
			let mockInfo = `
				devName=测试设备
				&osType=浏览器
				&osVersion=${this.browserVersion()}
				&appVersion=1.0.0
				&browser=${window.navigator.userAgent}
				&uuid=${Utils.uuid()}
			`;
			console.log(this.browserVersion());
			return Utils.base64(mockInfo);
		}
	}
	requestTime(){
		this.timestamp = String(new Date().getTime());
		return this.timestamp;
	}
	appSign(){
		if (this.nativeService.isMobile()) {

		}else{
			let mockSign = `
				${this.appInfo()}
				${this.requestTime()}
				browser
				${Utils.md5(Utils.uuid()+this.browserVersion()+this._appVersion)}
			`;
			return Utils.md5(mockSign);
		}
	}
};
