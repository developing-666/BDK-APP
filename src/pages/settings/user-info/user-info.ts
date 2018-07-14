import { Component } from '@angular/core';
import {
    NavController,
    NavParams,
    ToastController,
    ActionSheetController
} from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Validators } from '../../../providers/validators';
import { AppApi } from './../../../providers/app-api';
import { GlobalData } from '../../../providers/global-data';
import { INDUSTRY } from '../../../providers/constants';
import { DEFAULT_AVATAR } from '../../../providers/constants';
import { NativeService } from '../../../providers/native-service';
/**
 * Generated class for the UserInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-user-info',
    templateUrl: 'user-info.html'
})
export class UserInfoPage {
    ngForm: FormGroup;
    canEdit: boolean = false;
    formData: any = {};
    provinces: Array<any> = this.globalData.provinces;
    city: Array<any> = [];
    industrys: Array<any> = INDUSTRY;
    callback: any = this.navParams.get('callback');
    avatar: String = DEFAULT_AVATAR;
    private _userInfo: any;
    public get userInfo(): any {
        return this._userInfo;
    }
    public set userInfo(value: any) {
        this._userInfo = value;
        console.log('userInfo value', value);

        if (value != null && value != {}) {
            this.formData.name = value.name;
            this.formData.phone = value.phone;
            this.formData.work = value.work;
            this.formData.gender = value.gender;
            this.formData.birthday = value.birthday;
            this.formData.company = value.company;
            this.formData.industry = value.industry;
            if (value.provinceId) {
                this.formData.provinceId = value.provinceId;
                this.formData.cityId = value.cityId;
            }
        }
    }
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private fb: FormBuilder,
        public globalData: GlobalData,
        private appApi: AppApi,
        private toastCtrl: ToastController,
        private actionSheetCtrl: ActionSheetController,
        private nativeService: NativeService
    ) {
        this.createForm();
        this.initData();
    }

    ngOnInit() {
        this.queryProvinces();
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad UserInfoPage');
    }
    initData() {
        this.userInfo = this.globalData.user;
    }
    /**
     * 创建表单
     */
    createForm() {
        this.ngForm = this.fb.group(
            {
                name: ['', Validators.required],
                phone: ['', [Validators.phone, Validators.required]],
                work: ['', [Validators.required]],
                provinceId: [''],
                cityId: [''],
                gender: [''],
                birthday: [''],
                company: [''],
                industry: ['']
            },
            { updateOn: 'blur' }
        );
    }
    get name() {
        return this.ngForm.get('name');
    }
    get phone() {
        return this.ngForm.get('phone');
    }
    get work() {
        return this.ngForm.get('work');
    }
    get provinceId() {
        return this.ngForm.get('provinceId');
    }
    get cityId() {
        return this.ngForm.get('cityId');
    }
    get gender() {
        return this.ngForm.get('gender');
    }
    get birthday() {
        return this.ngForm.get('birthday');
    }
    get company() {
        return this.ngForm.get('company');
    }
    get industry() {
        return this.ngForm.get('industry');
    }

    change() {
        console.log(this.ngForm);
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
     * 获取用户信息
     */

    queryUserInfo() {
        this.appApi.queryUserInfo().subscribe(d => {
            console.log('queryUserInfo', d);
        });
    }

    /**
     * 更新用户信息
     */
    updateUserInfo() {
        this.appApi.updateUserInfo(this.userInfo).subscribe(d => {
            console.log('updateUserInfo', d);
            this.canEdit = false;
            this.callback(d).then();
        });
    }

    /**
     * 点击编辑按钮
     */
    clickEditButton() {
        console.log('this.ngForm.valid', this.ngForm.valid);

        if (this.canEdit) {
            if (this.ngForm.valid) {
                this.updateUserInfo();
            } else {
                this.presentToast();
            }
        } else {
            this.canEdit = true;
        }
    }

    presentToast() {
        const toast = this.toastCtrl.create({
            message: '请正确填写信息',
            position: 'middle',
            duration: 1500
        });
        // toast.onDidDismiss(() => {
        // });
        toast.present();
    }

    presentActionSheet() {
        const self = this;
        const actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: '拍照',
                    handler: () => {
                        self.nativeService
                            .getPictureByCamera({
                                targetWidth: 800,
                                targetHeight: 800
                            })
                            .subscribe(imageUrl => {
                                // 获取成功
                                this.avatar =
                                    'data:image/jpeg;base64,' + imageUrl;
                            });
                    }
                },
                {
                    text: '从相册获取',
                    handler: () => {
                        console.log('从相册获取');
                        this.nativeService
                            .getPictureByPhotoLibrary({
                                targetWidth: 800,
                                targetHeight: 800
                            })
                            .subscribe(imageUrl => {
                                // 获取成功
                                this.avatar =
                                    'data:image/jpeg;base64,' + imageUrl;
                            });
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }
}
