import { Component, Output, Input, EventEmitter } from '@angular/core';

import { AlertController, NavController, NavParams, App } from 'ionic-angular';

import { AddRemindPage } from '../../pages/remind/add-remind/add-remind';

import { AppApi } from '../../providers/app-api';
@Component({
    selector: 'remind-item',
    templateUrl: 'remind-item.html'
})
export class RemindItemComponent {
    @Output() goDelay: EventEmitter<any> = new EventEmitter();
    @Output() delay: EventEmitter<any> = new EventEmitter();
    @Output() delete: EventEmitter<any> = new EventEmitter();
    @Output() detail: EventEmitter<any> = new EventEmitter();
    @Input() data: any = {};
    @Input() index: number = undefined;

    constructor(
        private appApi: AppApi,
        private alertCtrl: AlertController,
        public app: App
    ) {
        console.log('Hello RemindItemComponent Component');
    }
    presentConfirm(item: any) {
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
                        this.appApi.taskDelete(item.id).subscribe(d => {
                            this.delete.emit({
                                ...item,
                                index: this.index
                            });
                        });
                    }
                }
            ]
        });
        alert.present();
    }
    itemDelay(item) {
        let callback = (): any => {
            this.delay.emit(item);
            return Promise.resolve();
        };
        this.goDelay.emit(item);
        this.app.getRootNav().push(AddRemindPage, {
            item,
            callback,
            mode: 'delay',
            type: item.customerId ? 'clientele' : 'other'
        });
    }
}