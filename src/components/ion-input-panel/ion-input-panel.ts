import {
    Component,
    Output,
    EventEmitter,
    OnInit,
    Input,
    ApplicationRef
} from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';

import { Keyboard } from '@ionic-native/keyboard';
import { Media, MediaObject } from '@ionic-native/media';
import {
    FileTransfer,
    FileUploadOptions,
    FileTransferObject,
    FileUploadResult
} from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Diagnostic } from '@ionic-native/diagnostic';

import { NativeService } from '../../providers/native-service';
import { Utils } from '../../providers/utils';
import iNoBounce from '../../assets/lib/inobounce';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'ion-input-panel',
    templateUrl: 'ion-input-panel.html'
})
export class IonInputPanelComponent implements OnInit {
    @Output() textInput: EventEmitter<any> = new EventEmitter();
    @Output() recordInput: EventEmitter<any> = new EventEmitter();
    @Output() deleteClick: EventEmitter<any> = new EventEmitter();
    @Output() playClick: EventEmitter<any> = new EventEmitter();
    @Output() recordEnd: EventEmitter<any> = new EventEmitter();
    @Input() disabled: boolean = false;
    isRecord: boolean = false;
    panelOpen: boolean = false;
    complete: boolean = false;
    seconds: number = 0;
    clock: any = null;
    recording: boolean = false;
    playing: boolean = false;
    keyboardHeight: number = 0;
    panelStyle: any = {};
    keyboardShow: any = null;
    keyboardHide: any = null;
    fileName: string = '';
    mediaObj: MediaObject = null;
    status: string = '';
    fileId: string = '';
    requestMicrophoneAuthorization: boolean = false;
    Media: any = null;
    constructor(
        public platform: Platform,
        private applicationRef: ApplicationRef,
        private keyboard: Keyboard,
        public media: Media,
        public ft: FileTransfer,
        private file: File,
        private nativeService: NativeService,
        private diagnostic: Diagnostic,
        private alertCtrl: AlertController
    ) {
        console.log('Hello IonInputPanelComponent Component');
    }
    ngOnInit() {
        //iNoBounce.enable();
        if (this.platform.is('ios')) {
            this.keyboardShow = this.keyboard.onKeyboardShow().subscribe(e => {
                this.keyboardHeight = e.keyboardHeight;
                this.panelStyle = {
                    transform: `translateY(-${e.keyboardHeight*(375/window.screen.width)}px)`
                };
                this.applicationRef.tick();
            });
            this.keyboardHide = this.keyboard.onKeyboardHide().subscribe(e => {
                this.panelStyle = {};
                this.applicationRef.tick();
            });
        }
    }
    ngOnDestroy() {
        //iNoBounce.disable();
        if (this.platform.is('ios')) {
            this.keyboardShow.unsubscribe();
            this.keyboardHide.unsubscribe();
        }
    }
    scrollDisable() {
        //iNoBounce.enable();
    }
    scrollEnable() {
        //iNoBounce.disable();
    }
    open() {
        this.panelOpen = !this.panelOpen;
    }
    text(e) {
        if (this.disabled) return;
        this.isRecord = false;
        this.textInput.emit(e);
    }
    inputFoucs() {
        if (this.disabled) return;
        this.isRecord = false;
        this.panelOpen = true;
    }
    record(e) {
        if (this.disabled) return;
        this.isRecord = true;
        this.panelOpen = true;
        this.recordInput.emit(e);
    }
    getAuthorization() {
        this.alertCtrl
            .create({
                title: '缺少麦克风权限',
                subTitle: '请在手机设置或app权限管理中开启',
                buttons: [
                    { text: '取消' },
                    {
                        text: '去开启',
                        handler: () => {
                            this.diagnostic.switchToSettings();
                        }
                    }
                ]
            })
            .present();
    }
    play(e) {
        this.playClick.emit(e);
        // this.mediaObj.play();
        this.playing = true;
        this.Media.play();
    }
    stop() {
        this.Media.pause();
        this.playing = false;
    }
    delete(e) {
        if (this.platform.is('ios')) {
            this.file
                .removeFile(this.file.cacheDirectory, this.fileName)
                .then(() => {
                    this.complete = false;
                    this.mediaObj.release();
                    this.mediaObj = null;
					this.Media.pause();
                    this.Media.removeEventListener('ended', () => {
                        this.playing = false;
                    });
                    this.Media = null;
                    this.deleteClick.emit(e);
                    this.seconds = 0;
                })
                .catch(() => {
                    this.nativeService.alert('删除文件失败，请重试');
                });
        } else {
        }
    }
    clockStart() {
        if (this.nativeService.isMobile()) {
            this.diagnostic.isMicrophoneAuthorized().then(e => {
                console.log(e);
                if (e) {
                    this.startRecording();
                } else {
                    if (this.requestMicrophoneAuthorization) {
                        this.getAuthorization();
                    } else {
                        this.diagnostic
                            .requestMicrophoneAuthorization()
                            .then(() => {
                                this.requestMicrophoneAuthorization = true;
                            });
                    }
                }
            });
        } else {
            this.nativeService.alert('请在APP中使用!');
            return;
        }
    }
    clockStop() {
        this.recording = false;
        clearInterval(this.clock);
        this.mediaObj.stopRecord();
    }
    //录音
    startRecording() {
        // this.fileName = Utils.uuid() + '.wav';
        this.fileId = Utils.uuid();
        this.fileName = `${this.fileId}.m4a`;
        this.file
            .createFile(this.file.cacheDirectory, this.fileName, true)
            .then(() => {
                this.mediaObj = this.media.create(
                    this.file.cacheDirectory.replace(/^file:\/\//, '') +
                        this.fileName
                );
                this.doRecord(this.mediaObj);
            })
            .catch(() => {
                this.nativeService.alert('录音失败,请重试');
            });
        // if (this.platform.is('ios')) {
        //
        // } else if (this.platform.is('android')) {
        // 	this.mediaObj = this.media.create(this.fileName);
        // 	this.doRecord(this.mediaObj);
        // }
    }
    doRecord(mediaObj: MediaObject) {
        // 开始录音
        this.recording = true;
        this.clock = window.setInterval(() => {
            this.seconds++;
        }, 1000);
        mediaObj.startRecord();

        // 监测录音状态的回调
        mediaObj.onStatusUpdate.subscribe(status =>
            this.showRecordStatus(status)
        );

        // 录音成功后的处理，如上传录音
        mediaObj.onSuccess.subscribe(() => {
            this.recordSuccess(mediaObj);
        });
        // 录音失败后的处理，如提示错误码
        mediaObj.onError.subscribe(error =>
            this.nativeService.alert('Record fail! Error: ' + error)
        );

        // 设置录音的长度，单位毫秒，ios / android 均有效
        window.setTimeout(() => {
            if (this.status == 'Running') {
                mediaObj.stopRecord();
            }
        }, 60 * 1000);
    }
    recordSuccess(mediaObj: MediaObject) {
        if (this.seconds <= 2) {
            this.nativeService.alert('录音太短');
        } else {
            this.complete = true;
            this.applicationRef.tick();
            this.doneRecord(
                this.file.cacheDirectory.replace(/^file:\/\//, '') +
                    this.fileName
            );
        }
    }
    doneRecord(src) {
        this.nativeService.preloadAudio(src).subscribe(e => {
            this.Media = e;
            this.Media.addEventListener('ended', () => {
                this.playing = false;
                this.applicationRef.tick();
                console.log('播放完成');
            });
            this.recordEnd.emit({
                audioUrl: this.file.cacheDirectory.replace(/^file:\/\//, '') + this.fileName,
                fileId:this.fileId,
                fileName:this.fileName,
                duration: this.seconds
            });
        });
    }
    // 根据录音状态码返回录音状态的方法
    showRecordStatus(status) {
        var statusStr = '';
        switch (status) {
            case 0:
                statusStr = 'None';
                break;
            case 1:
                statusStr = 'Start';
                break;
            case 2:
                statusStr = 'Running';
                break;
            case 3:
                statusStr = 'Paused';
                break;
            case 4:
                statusStr = 'Stopped';
                break;
            default:
                statusStr = 'None';
        }
        this.status = statusStr;
        console.log('status: ' + statusStr);
    }
}
