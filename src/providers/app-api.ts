import { Injectable } from '@angular/core';
import { HttpService } from './http-service';


@Injectable()
export class AppApi {
	constructor(
		private _http: HttpService
	) { }
	login(opts?: any): any {
		return this._http.post('/login', opts);
	}
	getCode(phone?: any): any {
		return this._http.get('/authenticationcode/sms/'+phone);
	}
	signIn(opts: any): any {
		return this._http.post('/register', opts);
	}
	queryProvinces():any{
		return this._http.get('/province/queryProvinces');
	}
}
