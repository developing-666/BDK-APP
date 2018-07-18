import {
    Component,
    Output,
    EventEmitter,
    Input,
    ElementRef,
    OnInit
} from '@angular/core';

import {
    AlertController,
    NavController,
    NavParams,
    App,
    Events
} from 'ionic-angular';

import { AddClientelePage } from '../../pages/clientele/add-clientele/add-clientele';
import { AddClienteleRemindPage } from '../../pages/remind/add-clientele-remind/add-clientele-remind';

import { NativeService } from '../../providers/native-service';
import { AppApi } from '../../providers/app-api';

function aaa(a) {
    console.log(this);
    
}


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
    update: any = id => {
        if (this.data.id === id) {
            this.customerDetails();
        }
    }
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        private $el: ElementRef,
        private appApi: AppApi,
        public app: App,
        private nativeService: NativeService,
        public events: Events
    ) {}
    ngOnInit() {
        this.events.subscribe('clientele:update', this.update);
    }
    ngOnDestroy() {
        console.log('ngOnDestroy');
        this.events.unsubscribe('clientele:update', this.update);
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
    itemClick(e, item) {
        e.stopPropagation();
        e.preventDefault();
        console.log(item);
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
    message(e, p) {
        e.stopPropagation();
        e.preventDefault();
        this.nativeService.sendSMS(p);
        console.log(p);
    }
    phone(e, p) {
        e.stopPropagation();
        e.preventDefault();
        this.nativeService.callNumber(p);
        console.log(p);
    }
    getHeight() {
        return this.$el.nativeElement.querySelector('.item-wrapper')
            .offsetHeight;
    }
    customerDetails(){
        this.appApi.customerDetails(this.data.id).subscribe(d => {
            console.log(d);
            this.data = d;
        });
    }
}
