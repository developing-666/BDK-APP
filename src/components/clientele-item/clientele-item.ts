import { Component, Output, EventEmitter, Input} from '@angular/core';

import { AlertController} from 'ionic-angular';
@Component({
    selector: 'clientele-item',
    templateUrl: 'clientele-item.html'
})
export class ClienteleItemComponent {
    @Output() remind: EventEmitter<any> = new EventEmitter();
    @Output() delete: EventEmitter<any> = new EventEmitter();
    @Input() data: any;
    constructor(private alertCtrl: AlertController) {}
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
                        this.delete.emit(i);
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
    message(p){
        console.log(p);
    }
    phone(p){
        console.log(p);
    }
}
