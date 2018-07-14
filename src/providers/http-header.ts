import { Injectable } from '@angular/core';

import { Utils } from './utils';
import { NativeService } from './native-service';
import { Device } from '@ionic-native/device';
@Injectable()
export class HttpHeader {
	private _appVersion:any = '1.0.0';
	private _uuid:any = '';
	private _browserVersion:any = '';
	private _platform:any = '';
	private _devName:any = '';
	private _osVersion:any = '';
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
		}
	}
	uuid(){
		if (this.nativeService.isMobile()) {
			this._uuid = this.device.uuid;
		}else{
			this._uuid = Utils.uuid();
		}
	}
	platform(){
		if (this.nativeService.isMobile()) {
			this._platform = this.device.platform;
		}else{
			this._platform = 'browser';
		}
	}
	devName(){
		if (this.nativeService.isMobile()) {
			this._devName = this.device.manufacturer;
		}else{
			this._devName = 'dev-device';
		}
	}
	osVersion(){
		if (this.nativeService.isMobile()) {
			this._osVersion = this.device.version;
		}else{
			this._osVersion = this.browserVersion();
		}
	}
	appInfo() {
		this.devName();
		this.platform();
		this.osVersion();
		this.uuid();
		let deviceInfo = 'devName='+this._devName+'&osType='+this._platform+'&osVersion='+this._osVersion+'&appVersion='+this._appVersion+'&browser='+window.navigator.userAgent+'&uuid='+this._uuid;
		console.log(deviceInfo);
		return Utils.base64(deviceInfo);
	}
	requestTime(){
		// this.timestamp = String(new Date().getTime());
		return String(new Date().getTime());
	}
	getHeader(){
		const requestTime = this.requestTime();
		const appInfo = this.appInfo();
		const appSign = appInfo+requestTime+this._platform+Utils.md5(this._uuid+this._osVersion+this._appVersion);
		return{
            token:'DAFUeyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODUwMTY2NzY2MSIsInVzZXJzZXNzaW9uIjoie1wiaWRcIjo2MDc1MyxcImNvbXBhbnlJZFwiOjYwNzU0LFwidHlwZVwiOjIsXCJuYW1lXCI6XCLlvKDkuIlcIixcInBob25lXCI6XCIxODUwMTY2NzY2MVwiLFwidXNlcm5hbWVcIjpcIjE4NTAxNjY3NjYxXCIsXCJhdXRob3JpdGllc1wiOm51bGwsXCJwYXNzd29yZE1vZGlmeVRpbWVcIjpudWxsfSIsImNyZWF0ZVRpbWUiOjE1MzA5NTA5NjA3NTMsImNyZWF0ZWQiOjE1MzA5NTA5NjA3NTEsImV4cCI6MTYxNzM1MDk2MH0.gGWKemWfLZ4WmCb3eETiw-EZmgCdQgeLio33SUTdTG-_iVyFxV4GGseOcFg-fDBoFtSulQhr61mSuSN19bwnlQ',
			appInfo,
			requestTime,
			appSign:Utils.md5(appSign)
		}
	}
};
