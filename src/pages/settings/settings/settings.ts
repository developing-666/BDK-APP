import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { UserInfoPage } from './../user-info/user-info';
import { AppApi } from './../../../providers/app-api';
import { ApplyEnterprisePage } from '../apply-enterprise/apply-enterprise';
import { AboutUsPage } from './../about-us/about-us';
import { HelpPage } from './../help/help';
import { GlobalData } from '../../../providers/global-data';'./../apply-enterprise/apply-enterprise';
import { DEFAULT_AVATAR } from '../../../providers/constants';
import { SettingPage } from '../setting/setting';


@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html',
})
export class SettingsPage {

    private _applyCompanyInfo: any;
    private _checkStatus: String = '';//申请状态 默认UNCHECK 'WAIT_CHECK', 'CHECK_SUCCESS', 'CHECK_FAIL'
    isWaitCheck: Boolean = this.checkStatus == this.globalData.checkStatus.WAIT_CHECK;
    isCheckSuccess: Boolean = this.checkStatus == this.globalData.checkStatus.CHECK_SUCCESS;
    isCheckFail:Boolean = this.checkStatus == this.globalData.checkStatus.CHECK_FAIL;

    userInfo:any = this.globalData.user;
    avatar:String = DEFAULT_AVATAR;
	constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private app:App,
        private appApi: AppApi,
        public globalData: GlobalData,
    ) {
        // this.applyCompanyInfo = this.globalData.applyCompanyInfo;
	}
    public get applyCompanyInfo(): any {
        return this._applyCompanyInfo;
    }
    public set applyCompanyInfo(value: any) {
        this._applyCompanyInfo = value;
        this.checkStatus = value.checkStatus;
    }
    public get checkStatus(): String {
        return this._checkStatus;
    }
    public set checkStatus(value: String) {
        this._checkStatus = value;
        this.changeStatus();
    }

    ngOnInit() {
        this.getApplyCompany();
        this.queryUserInfo();
    }
	ionViewDidLoad() {
		console.log('ionViewDidLoad SettingsPage');
    }
    changeStatus() {
        this.isWaitCheck = this.checkStatus == this.globalData.checkStatus.WAIT_CHECK;
        this.isCheckSuccess = this.checkStatus == this.globalData.checkStatus.CHECK_SUCCESS;
        this.isCheckFail = this.checkStatus == this.globalData.checkStatus.CHECK_FAIL;
    }
    
    /** 
     * 跳转个人资料页面 
     */    
    toUserInfoPage() {
        let callback = (d):any => {
            for (const name in d) {
                console.log(name);
                this.userInfo[name] = d[name];
            }
            return Promise.resolve();
        }
        this.app.getRootNav().push(UserInfoPage,{
            callback:callback
        });
    }
    /** 
     * 跳转申请企业版页面 
     */    
    toApplyEnterprisePage() {
        let callback = (d):any => {
            this.applyCompanyInfo = d;
            return Promise.resolve();
        }
        this.app.getRootNav().push(ApplyEnterprisePage,{
            callback:callback
        });
    }
    /** 
     * 跳转关于我们页面 
     */    
    toAboutUsPage() {
        this.app.getRootNav().push(AboutUsPage);
    }

    /** 
     * 跳转帮助页面 
     */    
    toHelpPage() {
        this.app.getRootNav().push(HelpPage);
    }

    /** 
     * 跳转设置页面 
     */    
    toSettingPage() {
        this.app.getRootNav().push(SettingPage);
    }

    /** 
     * 获取用户信息 
     */    
    queryUserInfo() {
        this.appApi.queryUserInfo().subscribe(d => {
            console.log('queryUserInfo', d);
            this.globalData.user = d;
            this.userInfo  = d;
        });
    }

    /** 
     * 获取企业版信息 
     */    
    getApplyCompany() {
        this.appApi.applyCompanyQueryInfo().subscribe(d=>{
            this.globalData.applyCompanyInfo = d;
            this.applyCompanyInfo = d;
        });
    }

    changeUserInfoType(type:String) {
        let param = { 
            type:''
        };
        if (type == 'NORAML') {
            param.type='NORAML';
        }else {
            param.type='COMPANY';
        }
        this.appApi.updateUserInfo(param).subscribe(d => {
            console.log('updateUserInfo', d);
            this.userInfo.type = param.type;
            this.globalData.user.type = param.type;
        });
    }

}
