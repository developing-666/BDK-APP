import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';

import FilterData from '../../providers/filter-bar-data';

import { Utils } from '../../providers/utils';
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
    filterData: any = FilterData;
    filterOpts: any;
    layout: number = 1;
    openPanel: boolean = false;
    showBack: boolean = false;
    backIn: boolean = false;
    activeIndex: number = 0;
    value: any = [];
    constructor() {}
    ngOnInit() {
        this.getOpts();
        this.initValue();
        this.panelHide();
    }
    initValue() {
        for (let item of this.filterData) {
            let obj = { name: item.name, key: item.key, value: [] };
            for (let tag of item.options) {
                if (tag.options && tag.options.length > 0) {
                    obj.value.push({
                        tag: tag.tag,
                        key: tag.key,
                        value: []
                    });
                } else {
                    obj.value = undefined;
                }
            }
            this.value.push(obj);
        }
        console.log(this.value);
    }
    getOpts() {
        this.filterOpts = this.filterData[this.activeIndex];
        console.log(this.filterOpts.options);
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
        console.log(this.layout);
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
        this.value[this.activeIndex].value = item.label;
        this.itemClick.emit(this.value);
        this.close();
    }
    tagTap(itemIndex, tag) {
        let path = this.value[this.activeIndex].value[itemIndex].value;
        let index = path.indexOf(tag.label);
        if (index > -1) {
            path.splice(index, 1);
        } else {
            path.push(tag.label);
        }
        this.tapClick.emit(this.value);
    }
    tagReset() {
        for (let item of this.value[this.activeIndex].value) {
            item.value = [];
        }
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
