import { Component, Output, EventEmitter, Input,ElementRef } from '@angular/core';

import { AlertController } from 'ionic-angular';
@Component({
    selector: 'clientele-item',
    templateUrl: 'clientele-item.html'
})
export class ClienteleItemComponent {
    @Output() remind: EventEmitter<any> = new EventEmitter();
    @Output() delete: EventEmitter<any> = new EventEmitter();
    @Output() details: EventEmitter<any> = new EventEmitter();
    @Input() data: any = {};
    @Input() index: number = undefined;
    get labels() {
        return this.data.labels ? JSON.parse(this.data.labels) : [];
    }
    constructor(
		private alertCtrl: AlertController,
		private $el:ElementRef
	) {}
    presentConfirm(i: any) {
        let alert = this.alertCtrl.create({
            title: '确认删除？',
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '确认',
                    handler: () => {
                        console.log('Buy clicked');
                        this.delete.emit({
                            id: i,
                            index: this.index
                        });
                    }
                }
            ]
        });
        alert.present();
    }
    itemRemind(i) {
        this.remind.emit(i);
    }
    itemDelete(i) {
        this.presentConfirm(i);
    }
    itemClick(i) {
        this.details.emit(i);
    }
    message(p) {
        console.log(p);
    }
    phone(p) {
        console.log(p);
    }
	getHeight(){
		return this.$el.nativeElement.querySelector('.item-wrapper').offsetHeight
	}
}
