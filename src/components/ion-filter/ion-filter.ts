import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import FilterData from '../../providers/filter-bar-data';

@Component({
    selector: 'ion-filter',
    templateUrl: 'ion-filter.html'
})
export class IonFilterComponent implements OnInit {
    @ViewChild('backdrop') backdrop: ElementRef;
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
    }
    initValue() {
        for (let item of this.filterData) {
            let obj = { name: item.name, key: item.key, values: [] };
            for (let tag of item.options) {
                if (tag.options && tag.options.length > 0) {
                    obj.values.push({
                        tag: tag.tag,
                        key: tag.key,
                        values: []
                    });
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
        this.openPanel = false;
        setTimeout(() => {
            this.getOpts();
            setTimeout(() => {
                this.openPanel = true;
            }, 50);
        }, 350);
        // this.getOpts();
        
    }
    itemClick() {}
}
