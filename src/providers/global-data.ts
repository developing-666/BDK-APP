import { Injectable } from '@angular/core';

@Injectable()
export class GlobalData {
    private _CUSTOMER_LABEL: Array<any>;
    private _CUSTOMER_LABELS: Array<any>;
    private _userId: string; // 用户id
    private _username: string; // 用户名
    private _user; // 用户详细信息

    private _token: string; // token

    // 设置http请求是否显示loading,注意:设置为true,接下来的请求会不显示loading,请求执行完成会自动设置为false
    private _showLoading = true;

    // 是否启用文件缓存
    private _enabledFileCache = true;

    //省份数据
    private _provinces: Array<any> = [];

	private _header:any = {};
    get userId(): string {
        return this._userId;
    }

    set userId(value: string) {
        this._userId = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }

    get token(): string {
        return this._token;
    }

    set token(value: string) {
        this._token = value;
    }

    get showLoading(): boolean {
        return this._showLoading;
    }

    set showLoading(value: boolean) {
        this._showLoading = value;
    }
    get enabledFileCache(): boolean {
        return this._enabledFileCache;
    }

    set enabledFileCache(value: boolean) {
        this._enabledFileCache = value;
    }
    get provinces(): any {
        return this._provinces;
    }

    set provinces(value: any) {
        this._provinces = value;
    }
    get CUSTOMER_LABEL() {
        return this._CUSTOMER_LABEL;
    }
    set CUSTOMER_LABEL(value: any) {
        this._CUSTOMER_LABEL = value;
    }
    get CUSTOMER_LABELS() {
        return this._CUSTOMER_LABELS;
    }
    set CUSTOMER_LABELS(value: any) {
        this._CUSTOMER_LABELS = value;
    }
	get header() {
        return this._header;
    }
    set header(value: any) {
        this._header = value;
    }
}
