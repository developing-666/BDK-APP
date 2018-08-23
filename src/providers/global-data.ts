import { Injectable } from '@angular/core';

@Injectable()
export class GlobalData {
    private _nav: any = undefined;
    private _CUSTOMER_LABEL: Array<any>;
    private _CUSTOMER_LABELS: Array<any>;
    private _ALLROLE: Array<any>;
    private _userId: string; // 用户id
    private _userTag: Array<string>; // 用户标签
    private _username: string; // 用户名
    private _user; // 用户详细信息

    private _token: string; // token

    // 设置http请求是否显示loading,注意:设置为true,接下来的请求会不显示loading,请求执行完成会自动设置为false
    private _showLoading = true;

    // 是否启用文件缓存
    private _enabledFileCache = true;

    //省份数据
    private _provinces: Array<any> = [];

    //申请企业版信息
    private _applyCompanyInfo: any = {};
    //当前应用播放的音频文件
    private _playingMedia: any = null;
    //当前应用的播放状态
    private _MediaPlaying:boolean = false;
    //申请状态
    checkStatus: any = {
        WAIT_CHECK: 'WAIT_CHECK',
        CHECK_SUCCESS: 'CHECK_SUCCESS',
        CHECK_FAIL: 'CHECK_FAIL'
    };
    //模态弹出登录页
    modalLoginPage: Boolean = false;

    private _header: any = {};
    get userId(): string {
        return this._userId;
    }

    set userId(value: string) {
        this._userId = value;
    }
    get userTag(): Array<string> {
        return this._userTag;
    }

    set userTag(value: Array<string>) {
        this._userTag = value;
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
    public get applyCompanyInfo(): any {
        return this._applyCompanyInfo;
    }
    public set applyCompanyInfo(value: any) {
        this._applyCompanyInfo = value;
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
    get nav() {
        return this._nav;
    }
    set nav(value: any) {
        this._nav = value;
    }
    get ALLROLE() {
        return this._ALLROLE;
    }
    set ALLROLE(value: any) {
        this._ALLROLE = value;
    }
    get playingMedia() {
        return this._playingMedia;
    }
    set playingMedia(value: any) {
        this._playingMedia = value;
    }
    get MediaPlaying() {
        return this._MediaPlaying;
    }
    set MediaPlaying(value: boolean) {
        this._MediaPlaying = value;
    }
    initData() {
        this.user = undefined;
        this.token = undefined;
        this.applyCompanyInfo = undefined;
    }
}
