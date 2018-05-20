import { Injectable } from '@angular/core';
import { HttpService } from './http-service';


@Injectable()
export class AppApi {
    constructor(private _http: HttpService) { }
    login(opts?: any): any {
        return this._http.postFormData('UserLogin', opts);
    }
}