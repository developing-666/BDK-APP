import { Component, ViewChild, ApplicationRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
    NavController,
    NavParams,
    ToastController,
    Events
} from 'ionic-angular';
import moment from 'moment';

import { IonInputPanelComponent } from '../../../components/ion-input-panel/ion-input-panel';
import { InfoInputComponent } from '../../../components/info-input/info-input';

import {
    FileTransfer,
    FileUploadOptions,
    FileTransferObject,
    FileUploadResult
} from '@ionic-native/file-transfer';
import { APP_SERVE_URL } from '../../../providers/constants';
import { GlobalData } from '../../../providers/global-data';
import { AppApi } from './../../../providers/app-api';
import { Utils } from '../../../providers/utils';
import { NativeService } from '../../../providers/native-service';

import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'page-setting-record',
    templateUrl: 'setting-record.html'
})
export class SettingRecordPage {
    @ViewChild('settingRecordForm') settingRecordForm: NgForm;
    @ViewChild(InfoInputComponent) infoInput: InfoInputComponent;
    @ViewChild(IonInputPanelComponent) inputPanel: IonInputPanelComponent;
    item: string = this.navParams.get('item');
    type: string = this.navParams.get('type');
    customerId: string = this.navParams.get('customerId');
    remind: any = this.navParams.get('remind');
    placeholder: string =
        '点击输入,在此写入跟进情况。可使用输入法自带的语音进行输入';
    infoContent: any;
    formData: any = {
        followStatus:
            this.remind && this.remind.customerId
                ? this.remind.customer.followStatus
                : undefined,
        taskId: this.remind ? this.remind.id : undefined,
        title: this.remind ? this.remind.title : undefined,
        customerId: this.customerId ? this.customerId : undefined,
        nextFollowTime: undefined
    };
    nextFollowTime = moment().format('YYYY-MM-DDTHH:mm:ssZ');
	nextFollowRemind:boolean = false;
    paths: Array<any> = [];
    audio: any = {
        // duration: 10,
        type: 'TASK'
    };
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private applicationRef: ApplicationRef,
        private appApi: AppApi,
        public toastCtrl: ToastController,
        public nativeService: NativeService,
        public ft: FileTransfer,
        private globalData: GlobalData,
        public events: Events
    ) {}
    ionViewDidLoad() {
        console.log(this.remind);
        // if  {
        //     this.formData.followStatus = this.remind.customer.followStatus;
        // }
        console.log(this.formData.followStatus);
        // setTimeout(() => {
        //     this.formData.followStatus = 6666666;
        //     console.log(this.formData.followStatus);
        // }, 2000);
    }

    openInputPanel() {
        this.inputPanel.inputFoucs();
    }
    hideInputPanel() {
        console.log('close');
        this.inputPanel.panelOpen = false;
        this.applicationRef.tick();
    }
    textInput() {
        this.infoInput.isRecord = false;
        setTimeout(() => {
            this.infoInput.setFocus();
        }, 200);
    }
    recordInput() {
        this.infoInput.isRecord = true;
    }
    voiceBarClick() {
        this.infoInput.isRecord = true;
        this.inputPanel.panelOpen = true;
    }
    recordEnd(e) {
        console.log(e);
    }

    setting() {
        if (this.settingRecordForm.valid) {
            const imgUpload = this.upoadImage();
            const audioUpload = this.uploadAudio();
            const result = Observable.combineLatest(imgUpload, audioUpload);
            result.subscribe(d => {
                if (d[0] && (d[1] === true || d[1].responseCode === 200)) {
                    const audio =
                        d[1] === true
                            ? undefined
                            : JSON.parse(d[1].response).data;
                    console.log(audio);
                    if (this.remind && this.remind.type === 'CUSTOMER') {
                        this.formData.customerId = this.remind.customerId;
                    }
                    if (this.customerId) {
                        this.formData.customerId = this.customerId;
                    }
                    this.formData.content = this.infoContent.content;
                    if (audio) {
                        this.formData.audio = {};
                        this.formData.audio.path = audio
                            ? audio.path
                            : undefined;
                        this.formData.audio.duration = this.audio.duration;
                    }
                    this.formData.pics = this.paths;
                    this.formData.nextFollowTime = moment(this.nextFollowTime)
                        .utc()
                        .format();
                    console.log('formData======================');
                    console.log(this.formData);
                    this.followCreate();
                }
            });
        }
    }
    upoadImage(): Observable<any> {
        return Observable.create(observer => {
            this.paths = [];
            if (this.infoContent.pics.length == 0) {
                observer.next(true);
            } else {
                const imgHttp: Array<Observable<any>> = [];
                for (let data of this.infoContent.pics) {
                    imgHttp.push(
                        this.appApi.upoadImage({
                            data,
                            type: 'FOLLOW'
                        })
                    );
                }
                const result = Observable.combineLatest(...imgHttp);
                result.subscribe(
                    d => {
                        if (d.length == this.infoContent.pics.length) {
                            for (let item of d) {
                                this.paths.push(item.path);
                            }
                            observer.next(true);
                        }
                    },
                    e => {
                        console.log(e);
                        this.nativeService.alert('图片上传失败,请重试');
                    }
                );
            }
        });
    }
    uploadAudio(): Observable<any> {
        return Observable.create(observer => {
            console.log(this.audio.audioUrl);
            if (!this.audio.audioUrl) {
                observer.next(true);
            } else {
                const header = this.globalData.header;
                let options: FileUploadOptions = {
                    headers: {
                        // 'Content-Type':'application/json; charset=UTF-8',
                        'DAFU-APP-INFO': header.appInfo,
                        'DAFU-REQUEST-TIME': header.requestTime,
                        'DAFU-APP-SIGN': header.appSign,
                        'DAFU-TOKEN': header.token
                    },
                    params: {
                        type: 'FOLLOW'
                    },
                    fileName: this.audio.fileName,
                    mimeType: 'audio/x-m4a'
                };
                const ftObj: FileTransferObject = this.ft.create();
                ftObj
                    .upload(
                        this.audio.audioUrl,
                        encodeURI(APP_SERVE_URL + '/upoad/audio'),
                        options
                    )
                    .then(
                        d => {
                            observer.next(d);
                        },
                        e => {
                            this.nativeService.alert('语音上传失败,请重试');
                        }
                    );
            }
        });
    }
    followCreate() {
        this.appApi.followCreate(this.formData).subscribe(d => {
            console.log(d);
            this.success();
            let id = this.customerId
                ? this.customerId
                : this.remind
                    ? this.remind.customerId
                    : undefined;
            console.log(id);
            this.events.publish('followRecord:update', id);
            this.events.publish('clientele:update', id);
        });
    }
    success() {
        const toast = this.toastCtrl.create({
            message: '创建成功',
            position: 'middle',
            duration: 1500
        });
        toast.onDidDismiss(() => {
            this.navCtrl.pop();
        });
        toast.present();
    }
}
