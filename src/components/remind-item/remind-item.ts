import { Component, Output, Input, EventEmitter,AfterContentInit } from '@angular/core';

import { AlertController, NavController, NavParams, App } from 'ionic-angular';

import { AddRemindPage } from '../../pages/remind/add-remind/add-remind';

import { AppApi } from '../../providers/app-api';
@Component({
    selector: 'remind-item',
    templateUrl: 'remind-item.html'
})
export class RemindItemComponent implements AfterContentInit {
    @Output() goDelay: EventEmitter<any> = new EventEmitter();
    @Output() delay: EventEmitter<any> = new EventEmitter();
    @Output() delete: EventEmitter<any> = new EventEmitter();
    @Output() detail: EventEmitter<any> = new EventEmitter();
    @Input() remind: any = {};
    @Input() index: number = undefined;
	planRemindTime:string = '';
    constructor(
        private appApi: AppApi,
        private alertCtrl: AlertController,
        public app: App
    ) {
    }
	ngAfterContentInit() {
        console.log('RemindItem'+this.remind);

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
            item:this.remind,
            callback,
            mode: 'delay',
            type: this.remind.customerId ? 'clientele' : 'other'
        });
    }
	itemClick(){
		this.detail.emit(this.remind);
	}
}
