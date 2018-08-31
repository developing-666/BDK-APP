import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Validators } from '../../../providers/validators';
import { AppApi } from './../../../providers/app-api';
import { GlobalData } from '../../../providers/global-data';
import { INDUSTRY } from '../../../providers/constants';
import { Utils } from './../../../providers/utils';

@IonicPage()
@Component({
    selector: 'page-apply-enterprise',
    templateUrl: 'apply-enterprise.html'
})
export class ApplyEnterprisePage {
    ngForm: FormGroup;
    formData: any = {
        // applyPeople: null,
        // company: null,
        // industry: null,
        // phone: null,
        // provinceId: null,
        // cityId: null
    };
    provinces: Array<any> = this.globalData.provinces;
    city: Array<any> = [];
    industrys: Array<any> = INDUSTRY;
    private _applyCompanyInfo: any = {};
    private _checkStatus_1: String = 'UNCHECK'; //申请状态 默认UNCHECK 'WAIT_CHECK', 'CHECK_SUCCESS', 'CHECK_FAIL'
    isUncheck: Boolean = this.checkStatus == 'UNCHECK';
    isWaitCheck: Boolean =
        this.checkStatus == this.globalData.checkStatus.WAIT_CHECK;
    isCheckSuccess: Boolean =
        this.checkStatus == this.globalData.checkStatus.CHECK_SUCCESS;
    isCheckFail: Boolean =
        this.checkStatus == this.globalData.checkStatus.CHECK_FAIL;
    canEdit: boolean = true;
    callback: any = this.navParams.get('callback');
    /**
     * set get
     */

    public get applyCompanyInfo(): any {
        return this._applyCompanyInfo;
    }
    public set applyCompanyInfo(value: any) {
        this._applyCompanyInfo = value;
        if (value != null && value != {}) {
            this.formData.applyPeople = value.applyPeople;
            this.formData.company = value.company;
            this.formData.industry = value.industry;
            this.formData.phone = value.phone;
            this.formData.provinceId = value.provinceId;
            this.formData.cityId = value.cityId;
            this.checkStatus = value.checkStatus;
        }
    }
    public get checkStatus(): String {
        return this._checkStatus_1;
    }
    public set checkStatus(value: String) {
        this._checkStatus_1 = value;
        this.changeStatus();
    }
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private fb: FormBuilder,
        public globalData: GlobalData,
        private appApi: AppApi
    ) {
        this.createForm();
        this.initData();
    }

    ngOnInit() {
        this.queryProvinces();
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad ApplyEnterprisePage');
    }

    /**
     * 初始化数据
     */

    initData() {
        this.applyCompanyInfo = Utils.deepClone(
            this.globalData.applyCompanyInfo
        );
    }
    /**
     * 创建表单
     */
    createForm() {
        this.ngForm = this.fb.group(
            {
                applyPeople: ['', Validators.required],
                phone: ['', [Validators.phone, Validators.required]],
                provinceId: ['', [Validators.required]],
                cityId: ['', [Validators.required]],
                company: ['', [Validators.required]],
                industry: ['', [Validators.required]]
            },
            { updateOn: 'blur' }
        );
    }
    get applyPeople() {
        return this.ngForm.get('applyPeople');
    }
    get phone() {
        return this.ngForm.get('phone');
    }
    get provinceId() {
        return this.ngForm.get('provinceId');
    }
    get cityId() {
        return this.ngForm.get('cityId');
    }
    get company() {
        return this.ngForm.get('company');
    }
    get industry() {
        return this.ngForm.get('industry');
    }

    changeStatus() {
        this.isUncheck = this.checkStatus == 'UNCHECK';
        this.isWaitCheck = this.checkStatus == 'WAIT_CHECK';
        this.isCheckSuccess = this.checkStatus == 'CHECK_SUCCESS';
        this.isCheckFail = this.checkStatus == 'CHECK_FAIL';
        if (this.checkStatus == 'UNCHECK' || this.checkStatus == 'CHECK_FAIL') {
            this.canEdit = true;
        } else {
            this.canEdit = false;
        }
    }

    /**
     * 获取省份
     */
    queryProvinces() {
        if (this.provinces.length == 0) {
            this.appApi.queryProvinces().subscribe(d => {
                console.log(d);
                this.globalData.provinces = d;
                this.provinces = d;
            });
        }
    }
    /**
     * 根据省份获取城市
     */
    queryCitiesByProvinceId() {
        this.appApi
            .queryCitiesByProvinceId(this.formData.provinceId)
            .subscribe(d => {
                console.log(d);
                this.city = d;
            });
    }

    /**
     * 提交申请
     */

    submitApply() {
        this.appApi.applyCompanyCreate(this.formData).subscribe(d => {
            console.log(d);
            this.getApplyCompany();
        });
    }

    /**
     * 获取企业版信息
     */

    getApplyCompany() {
        this.appApi.applyCompanyQueryInfo().subscribe(d => {
            console.log('applyCompanyQueryInfo', d);
            this.globalData.applyCompanyInfo = d;
            this.checkStatus = d.checkStatus;
            this.callback(d).then();
        });
    }
}
