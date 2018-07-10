import { Injectable } from '@angular/core';

import { Utils } from './utils';
import { NativeService } from './native-service';
import { Device } from '@ionic-native/device';
@Injectable()
export class HttpHeader {
	private _appVersion: any = '1.0.0';
	private _uuid: any = '';
	private _browserVersion: any = '';
	private _platform: any = '';
	private _devName: any = '';
	private _osVersion: any = '';
	private _token: string = '';
	timestamp: string = '';
	get appVersion(): string {
		return this._appVersion;
	}
	set appVersion(value: string) {
		this._appVersion = value;
	}

	get token(): string {
		return this._token;
	}
	set token(value: string) {
		this._token = value;
	}

	constructor(
		public nativeService: NativeService,
		private device: Device
	) { }
	browserVersion() {
		if (/Android (\d+\.\d+)/.test(window.navigator.userAgent)) {
			return RegExp.$1;
		} else if (/Version\/(\d+\.\d+)/.test(window.navigator.userAgent)) {
			return RegExp.$1;
		}
	}
	uuid() {
		if (this.nativeService.isMobile()) {
			this._uuid = this.device.uuid;
		} else {
			this._uuid = Utils.uuid();
		}
	}
	platform() {
		if (this.nativeService.isMobile()) {
			this._platform = this.device.platform;
		} else {
			this._platform = 'browser';
		}
	}
	devName() {
		if (this.nativeService.isMobile()) {
			this._devName = this.device.manufacturer;
		} else {
			this._devName = 'dev-device';
		}
	}
	osVersion() {
		if (this.nativeService.isMobile()) {
			this._osVersion = this.device.version;
		} else {
			this._osVersion = this.browserVersion();
		}
	}
	appInfo() {
		this.devName();
		this.platform();
		this.osVersion();
		this.uuid();
		let deviceInfo = 'devName=' + encodeURIComponent(this._devName) + '&osType=' + encodeURIComponent(this._platform) + '&osVersion=' + encodeURIComponent(this._osVersion) + '&appVersion=' + encodeURIComponent(this._appVersion) + '&browser=' + encodeURIComponent(window.navigator.userAgent) + '&uuid=' + encodeURIComponent(this._uuid);
		// console.log(deviceInfo);
		return Utils.base64(deviceInfo);
	}
	requestTime() {
		// this.timestamp = String(new Date().getTime());
		return String(new Date().getTime());
	}
	getHeader() {
		const requestTime = this.requestTime();
		const appInfo = this.appInfo();
		// console.log(appInfo);
		const appSign = appInfo + requestTime + encodeURIComponent(this._platform) + Utils.md5(encodeURIComponent(this._uuid) + encodeURIComponent(this._osVersion) + encodeURIComponent(this._appVersion));
		return { token: this.token ? this.token : 'DAFUeyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODUwMTY2NzY2MSIsInVzZXJzZXNzaW9uIjoie1wiaWRcIjo2MDc1MyxcImNvbXBhbnlJZFwiOjYwNzU0LFwidHlwZVwiOjIsXCJuYW1lXCI6XCLlsI_mmI5cIixcInBob25lXCI6XCIxODUwMTY2NzY2MVwiLFwidXNlcm5hbWVcIjpcIjE4NTAxNjY3NjYxXCIsXCJhdXRob3JpdGllc1wiOm51bGwsXCJ0b2tlbkNoYW5nZVRpbWVcIjoxNTMxMjAzMzAwMDAwfSIsImNyZWF0ZVRpbWUiOjE1MzEyMDMzODM4NDEsImNyZWF0ZWQiOjE1MzEyMDMzMjM4MzcsImV4cCI6MTYxNzYwMzMyM30.6g71lLH7PIOPJo5JwU2vQzkzFEARdpgumVxPc5a3vtwfIFUws-liMtryySbeaR7EyB3hSCJ6zdPmr2MzzVviVg', appInfo, requestTime, appSign: Utils.md5(appSign) };
	}
};
