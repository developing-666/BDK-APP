import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';


import { FILTERDATA } from '../../providers/constants';

import { Utils } from '../../providers/utils';
import { GlobalData } from '../../providers/global-data';
import { AppApi } from '../../providers/app-api';
import { Observable} from 'rxjs/Rx';
@Component({
    selector: 'ion-filter',
    templateUrl: 'ion-filter.html'
})
export class IonFilterComponent implements OnInit {
    @ViewChild('filterPanel') filterPanel: ElementRef;
    @Output() reset: EventEmitter<any> = new EventEmitter();
    @Output() filter: EventEmitter<any> = new EventEmitter();
    @Output() itemClick: EventEmitter<any> = new EventEmitter();
    @Output() tapClick: EventEmitter<any> = new EventEmitter();
    @Output() panelHidden: EventEmitter<any> = new EventEmitter();
    filterData: any = FILTERDATA;
    filterOpts: any;
    layout: number = 1;
    openPanel: boolean = false;
    showBack: boolean = false;
    backIn: boolean = false;
    activeIndex: number = 0;
    value: any = [];
    constructor(public globalData: GlobalData, public appApi: AppApi) {}
    ngOnInit() {
        this.panelHide();
        this.queryLabelByType();
        
    }
    queryLabelByType() {
        const post1 = this.appApi.queryLabelByType('CUSTOMER_LABEL');
        const post2 = this.appApi.queryLabelByType('CUSTOMER_LABELS');
        const result = Observable.combineLatest(post1, post2);
       
        result.subscribe(d => {
            this.globalData.CUSTOMER_LABEL = d[0];
            this.globalData.CUSTOMER_LABELS = d[1];
            this.filterData[0].options[0].options = d[0];
            this.filterData[0].options[1].options = d[1];
            this.getOpts();
            this.initValue();
            console.log(this.globalData);
            }, e => {
                console.log(e);
            });
        
    }
    initValue() {
        for (let item of this.filterData) {
            let obj = { name: item.name, key: item.key, value: [] };
            item.options.forEach((tag, index) => {
                if (tag.options && tag.options.length > 0) {
                    obj.value.push({
                        tag: tag.tag,
                        key: tag.key,
                        value: index == 0 ? '' : []
                    });
                } else {
                    obj.value = undefined;
                }
            });
            this.value.push(obj);
        }
        console.log(this.value);
    }
    getOpts() {
        this.filterOpts = this.filterData[this.activeIndex];
        this.getLayout();
    }
    getLayout() {
        let layout = 1;
        for (let item of this.filterOpts.options) {
            if (item.options && item.options.length > 0) {
                layout = 2;
            }
        }
        this.layout = layout;
    }
    open(i) {
        if (this.activeIndex != i) {
            this.activeIndex = i;
            if (this.openPanel) {
                this.toggle();
            } else {
                this.getOpts();
                this.showBack = true;
                setTimeout(() => {
                    this.openPanel = true;
                    this.backIn = true;
                }, 0);
            }
        } else {
            if (this.openPanel) {
                this.close();
            } else {
                this.showBack = true;
                setTimeout(() => {
                    this.openPanel = true;
                    this.backIn = true;
                }, 0);
            }
        }
    }
    close() {
        this.openPanel = false;
        this.backIn = false;
        setTimeout(() => {
            this.showBack = false;
        }, 200);
    }
    toggle() {
        // this.openPanel = false;
        // setTimeout(() => {
        //     this.getOpts();
        //     setTimeout(() => {
        //         this.openPanel = true;
        //     }, 0);
        // }, 350);
        this.getOpts();
    }
    itemTap(item) {
        this.value[this.activeIndex].value = item.value;
        this.itemClick.emit(this.value);
        this.close();
    }
    tagTap(itemIndex, tag) {
        let path = this.value[this.activeIndex].value[itemIndex].value;
        if (itemIndex==0){
            if (path == tag.label) {
            this.value[this.activeIndex].value[itemIndex].value = '';
            } else {
                this.value[this.activeIndex].value[itemIndex].value = tag.label;
            }
        }else{
            let index = path.indexOf(tag.label);
            if (index > -1) {
                path.splice(index, 1);
            } else {
                path.push(tag.label);
            }
        }
        this.tapClick.emit(this.value);
    }
    tagReset() {
        this.value[this.activeIndex].value.forEach((item,index) => {
            item.value = index==0?'':[];
        });
        this.reset.emit(this.value);
    }
    tagFilter() {
        this.filter.emit(this.value);
        this.close();
    }
    panelHide() {
        this.filterPanel.nativeElement.addEventListener(
            Utils.transitionEnd(),
            e => {
                if (e && e.propertyName == 'transform' && !this.openPanel) {
                    this.panelHidden.emit(this.value);
                }
            },
            false
        );
    }
}
