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
    formData: any = {
        avatar:DEFAULT_AVATAR,
        name:undefined,
        phone:undefined,
        work:undefined,
        provinceId:undefined,
        cityId:undefined,
        gender:undefined,
        birthday:undefined,
        company:undefined,
        industry:undefined,
    };
    provinces: Array<any> = this.globalData.provinces;
    city: Array<any> = [];
    industrys: Array<any> = INDUSTRY;
    callback: any = this.navParams.get('callback');
    private _userInfo: any;
    public get userInfo(): any {
        return this._userInfo;
    }
    public set userInfo(value: any) {
        this._userInfo = value;
        console.log('userInfo value', value);
        
        if (value != null && value != {}) {

            for (const name in value) {
                if (value[name] != null) {
                    this.formData[name] = value[name];
                }
            }
            if (this.formData.avatar.indexOf('base64')>-1) {
                this.appApi.upoadImage({
                    data:this.formData.avatar,
                    type:'USER_AVATAR'
                }).subscribe(d=>{
                    this.formData.avatar = d.url;
                    console.log('avatar======',this.formData.avatar);
                });
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
                name: ['', [Validators.required,Validators.maxLength(15)]],
                phone: ['', [Validators.phone, Validators.required]],
                work: ['',[Validators.maxLength(15)]],
                provinceId: [''],
                cityId: [''],
                gender: [''],
                birthday: [''],
                company: ['',[Validators.maxLength(30)]],
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
        if(this.formData.provinceId == null || this.formData.provinceId == ''){
            return;
        }
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
        this.appApi.updateUserInfo(this.formData).subscribe(d => {
            console.log('updateUserInfo', d);
            this.canEdit = false;
            for (const name in this.formData) {
                this.globalData.user[name] = this.formData[name];
            }
            this.callback(this.formData).then();
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
                console.log(this.ngForm);
                
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
                                // this.formData.avatar = imageUrl;
                                this.appApi.upoadImage({
                                    data:imageUrl,
                                    type:'USER_AVATAR'
                                }).subscribe(d=>{
                                    this.formData.avatar = d.url;
                                    console.log('avatar======',this.formData.avatar);
                                });
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
                                // this.formData.avatar = imageUrl;
                                    console.log('avatar======',this.formData.avatar);
                                this.appApi.upoadImage({
                                    data:imageUrl,
                                    type:'USER_AVATAR'
                                }).subscribe(d=>{
                                    this.formData.avatar = d.url;
                                    console.log('avatar======',this.formData.avatar);
                                });
                                    
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
