import { Component, Output, EventEmitter, Input,ElementRef } from '@angular/core';



import { AddClientelePage}from'../../pages/clientele/add-clientele/add-clientele';

import { AlertController, NavController, NavParams,App } from 'ionic-angular';


import { AddClienteleRemindPage } from '../../pages/remind/add-clientele-remind/add-clientele-remind';
import { AppApi } from '../../providers/app-api';
@Component({
    selector: 'clientele-item',
    templateUrl: 'clientele-item.html'
})
export class ClienteleItemComponent {
    @Output() remind: EventEmitter<any> = new EventEmitter();
    @Output() delete: EventEmitter<any> = new EventEmitter();
    @Output() details: EventEmitter<any> = new EventEmitter();
    @Input() noPush: boolean = false;
    @Input() detail: boolean = true;
    @Input() data: any = {};
    @Input() index: number = undefined;
    get labels() {
        return this.data.labels ? JSON.parse(this.data.labels) : [];
    }
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        private $el: ElementRef,
        private appApi: AppApi,
        public app: App
    ) {}
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
                        this.appApi.customerDelete(item.id).subscribe(d => {
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
    itemRemind(item) {
        let callback = (): any => {
            this.remind.emit(item);
            return Promise.resolve();
        };
        this.app.getRootNav().push(AddClienteleRemindPage, {
            item,
            callback
        });
    }
    itemDelete(item) {
        this.presentConfirm(item);
    }
    itemClick(item) {
        let callback = (done): any => {
            console.log(done);

            return Promise.resolve();
        };
        if (this.detail) {
            this.navCtrl.push(AddClientelePage, {
                callback,
                item,
                type: 'edit'
            });
        }
        this.details.emit(item);
    }
    message(p) {
        console.log(p);
    }
    phone(p) {
        console.log(p);
    }
    getHeight() {
        return this.$el.nativeElement.querySelector('.item-wrapper')
            .offsetHeight;
    }
}
