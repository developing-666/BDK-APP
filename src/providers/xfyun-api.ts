import { Injectable } from '@angular/core';
import { HttpService } from './http-service';

@Injectable()
export class XfyunApi {
	constructor(private _http: HttpService) { }
	bankcard(opts?: any) {
		return this._http.xfyunPost('http://webapi.xfyun.cn/v1/service/v1/ocr/bankcard', '11901c11e931f32972130b049d24f852',{
			engine_type:'bankcard'
		}, opts);
	}
}
