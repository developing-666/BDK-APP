import { Component, Output, Input, EventEmitter,OnChanges,SimpleChanges } from '@angular/core';

import { AlertController, ModalController, App } from 'ionic-angular';

import { AddRemindPage } from '../../pages/remind/add-remind/add-remind';
import { SettingRecordPage } from '../../pages/clientele/setting-record/setting-record';

import { AppApi } from '../../providers/app-api';

import { GalleryModal } from '../../modules/ion-gallery/index';
@Component({
    selector: 'remind-item',
    templateUrl: 'remind-item.html'
})
export class RemindItemComponent implements OnChanges {
    @Output() refresh: EventEmitter<any> = new EventEmitter();
    @Output() goDelay: EventEmitter<any> = new EventEmitter();
    @Output() delay: EventEmitter<any> = new EventEmitter();
    @Output() delete: EventEmitter<any> = new EventEmitter();
    @Output() detail: EventEmitter<any> = new EventEmitter();
    @Input() remind: any = {};
    @Input() index: number = undefined;
    planRemindTime: string = '';
    pics: Array<any> = [];
    constructor(
        private appApi: AppApi,
        private alertCtrl: AlertController,
        public app: App,
        public modalCtrl: ModalController
    ) {}
    ngOnChanges(changes: SimpleChanges){
        console.log(changes);
        if (changes.remind) {
            this.getPics();
        }
    }
    presentConfirm(e) {
        e.stopPropagation();
        e.preventDefault();
        let alert = this.alertCtrl.create({
            title: '确认删除？',
            buttons: [
                {
                    text: '取消',
                    role: 'cancel'
                },
                {
                    text: '确认',
                    handler: () => {
                        this.appApi.taskDelete(this.remind.id).subscribe(d => {
                            this.delete.emit({
                                ...this.remind,
                                index: this.index
                            });
                        });
                    }
                }
            ]
        });
        alert.present();
    }
    itemDelay(e) {
        e.stopPropagation();
        e.preventDefault();
        let callback = (): any => {
            this.delay.emit(this.remind);
            return Promise.resolve();
        };
        this.goDelay.emit(this.remind);
        this.app.getRootNav().push(AddRemindPage, {
            item: this.remind,
            callback,
            mode: 'delay',
            type: this.remind.customerId ? 'clientele' : 'other'
        });
    }
    itemClick(e) {
        e.stopPropagation();
        e.preventDefault();
        this.detail.emit(this.remind);
    }
    write(e) {
        e.stopPropagation();
        e.preventDefault();
        let refresh: any = () => {
            this.refresh.emit(true);
            return Promise.resolve();
        };
        this.app.getRootNav().push(SettingRecordPage, {
            refresh,
            remind: this.remind
        });
    }
    getPicUrl(value) {
        const index = value.lastIndexOf('.');
        const len = value.length;
        const path = value.substring(0, index);
        const suffix = value.substring(index, len);
        return `${path}_-x-${suffix}`;
    }
    getPics() {
        for (const pic of this.remind.pics) {
            this.pics.push({
                url: this.getPicUrl(pic),
                title: this.remind.title
            });
        }
    }
    viewImg(i) {
        let modal = this.modalCtrl.create(GalleryModal, {
            photos: this.pics,
            initialSlide: i
        });
        modal.present();
    }
}
