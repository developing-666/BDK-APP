import { Component, Output, EventEmitter, Input,ElementRef } from '@angular/core';

import { AlertController, NavController, NavParams,App } from 'ionic-angular';

import { AddClientelePage}from'../../pages/clientele/add-clientele/add-clientele';
import { AddClienteleRemindPage } from '../../pages/remind/add-clientele-remind/add-clientele-remind';

import { NativeService } from '../../providers/native-service';
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
    labels: Array<any> = this.data.labels ? this.data.labels : [];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        private $el: ElementRef,
        private appApi: AppApi,
        public app: App,
        private nativeService: NativeService,
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
        this.remind.emit(item);
        this.app.getRootNav().push(AddClienteleRemindPage, {
            item
        });
    }
    itemDelete(item) {
        this.presentConfirm(item);
    }
    itemClick(e,item) {
		e.stopPropagation();
		e.preventDefault();
		console.log(item)
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
    message(e,p) {
		e.stopPropagation();
		e.preventDefault();
		this.nativeService.sendSMS(p);
        console.log(p);
    }
    phone(e,p) {
		e.stopPropagation();
		e.preventDefault();
		this.nativeService.callNumber(p);
        console.log(p);
    }
    getHeight() {
        return this.$el.nativeElement.querySelector('.item-wrapper')
            .offsetHeight;
    }
}
