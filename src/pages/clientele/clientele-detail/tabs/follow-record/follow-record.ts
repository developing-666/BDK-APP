import { Component, ViewChild } from '@angular/core';
import {
    NavController,
    NavParams,
    App,
    Events,
    Content,
    ModalController
} from 'ionic-angular';

import { AppApi } from '../../../../../providers/app-api';
import { SettingRecordPage } from '../../../setting-record/setting-record';

import { GalleryModal } from '../../../../../modules/ion-gallery/index';
import { Utils } from '../../../../../providers/utils';

@Component({
    selector: 'page-follow-record',
    templateUrl: 'follow-record.html'
})
export class FollowRecordPage {
    @ViewChild(Content) content: Content;
	isHasNext: boolean = false;
    currentPage: number = 1;
    id: string = this.navParams.get('id');
    record: Array<any> = [];
    pics: Array<any> = [];
    update: any = () => {
        this.currentPage = 1;
        this.content.scrollToTop(0);
        setTimeout(() => {
            this.queryCustomerFollowDetailByPage();
        }, 0);
    };
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public appApi: AppApi,
        public app: App,
        public events: Events,
        public modalCtrl: ModalController
    ) {}

    ionViewDidLoad() {
        this.queryCustomerFollowDetailByPage();
        this.events.subscribe('followRecord:update', this.update);
    }
    ionViewWillUnload() {
        this.events.unsubscribe('followRecord:update', this.update);
    }
    queryCustomerFollowDetailByPage(e?: any) {
        this.appApi
            .queryCustomerFollowDetailByPage({
                currentPageIndex: this.currentPage,
                params: {
                    queryCustomerId: this.id,
                    queryFetchOnwer: true
                }
            })
            .subscribe(
                d => {
					this.isHasNext = d.isHasNext;
                    if (this.currentPage == 1) {
                        this.record = d.items;
                    } else {
                        this.record = this.record.concat(d.items);
                    }
					setTimeout(() => {
						this.currentPage++;
					}, 0);
                    if (e) {
                        setTimeout(() => {
                            e.complete();
                        }, 200);
                    }
                },
                err => {
                    console.log(err);
                    if (e) {
                        setTimeout(() => {
                            e.complete();
                        }, 200);
                    }
                }
            );
    }
    doRefresh(e) {
        console.log(e);
        this.currentPage = 1;
        this.queryCustomerFollowDetailByPage(e);
    }
    loadMore(e) {
        console.log(e);
        this.queryCustomerFollowDetailByPage(e);
    }
    itemClick(e, item) {
        e.stopPropagation();
        e.preventDefault();
        console.log(item);

        this.app.getRootNav().push(SettingRecordPage, {
            followId: item.id
        });
    }
    add() {
        this.app.getRootNav().push(SettingRecordPage, {
            customerId: this.id
        });
    }
    getPics(e,item, i) {
        e.stopPropagation();
        e.preventDefault();
        this.pics = [];
        for (const pic of item.pics) {
            this.pics.push({
                url: Utils.getPicUrl(pic),
                title: item.title
            });
        }
        this.viewImg(i);
    }
    viewImg(i) {
        let modal = this.modalCtrl.create(GalleryModal, {
            photos: this.pics,
            initialSlide: i
        });
        modal.present();
    }
}
