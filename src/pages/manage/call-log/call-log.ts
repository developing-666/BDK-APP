import { Component, ViewChild, ApplicationRef } from '@angular/core';
import {
	IonicPage,
    NavController,
    NavParams,
    Platform,
    List,
    Content
} from 'ionic-angular';

import { AppApi } from '../../../providers/app-api';
import { NativeService } from '../../../providers/native-service';
import { GlobalData } from '../../../providers/global-data';

@IonicPage()
@Component({
    selector: 'page-call-log',
    templateUrl: 'call-log.html'
})
export class CallLogPage {
    @ViewChild(List)
    list: List;
    @ViewChild(Content)
    content: Content;
    currentPage: number = 1;
    isHasNext: boolean = false;
    logs: Array<any> = [];
    queryDate: string = undefined;
    queryCalled: string = undefined;
    allAllCalled: Array<string> = [];
    Media: any = undefined;
    playingId: string = undefined;
    update: any = () => {
        this.currentPage = 1;
        this.content.scrollToTop(0);
        setTimeout(() => {
            this.queryCallLog();
        }, 0);
    };
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public plt: Platform,
        private appApi: AppApi,
        private applicationRef: ApplicationRef,
        private nativeService: NativeService,
        public globalData: GlobalData
    ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad CallLogPage');
        this.queryCallLog();
        this.queryAllCalled();
    }
    queryCallLog(e?: any) {
        this.appApi
            .queryCallLog({
                currentPageIndex: this.currentPage,
                params: {
                    queryStartDate: this.queryDate,
                    queryEndDate: this.queryDate,
                    queryCalled: this.queryCalled
                }
            })
            .subscribe(
                d => {
                    this.isHasNext = d.isHasNext;
                    if (this.currentPage == 1) {
                        this.logs = d.items;
                    } else {
                        this.logs = this.logs.concat(d.items);
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
    loadMore(e) {
        this.queryCallLog(e);
    }
    doRefresh(e) {
        this.currentPage = 1;
        this.queryCallLog(e);
    }
    addClientele() {}
    call(d) {
        this.list.closeSlidingItems();
        this.nativeService.callNumber(d);
    }
    loadingMedia(item) {
        if (this.globalData.MediaPlaying) {
            this.globalData.playingMedia.pause();
            this.globalData.playingMedia = null;
        }
        this.nativeService.preloadAudio(item.recFileName).subscribe(e => {
            this.Media = e;
            this.Media.addEventListener('ended', () => {
                this.playingId = undefined;
                this.globalData.MediaPlaying = false;
                this.applicationRef.tick();
                console.log('播放完成');
            });
            this.playingId = item.id;
            this.globalData.playingMedia = this.Media;
            this.globalData.MediaPlaying = true;
            this.Media.play();
        });
    }
    queryAllCalled() {
        this.appApi.queryAllCalled().subscribe(d => {
            console.log(d);
            this.allAllCalled = d;
        });
    }
}
