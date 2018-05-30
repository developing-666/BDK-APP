import { Component,OnInit } from '@angular/core';


import FilterData from '../../providers/filter-bar-data'

@Component({
    selector: "ion-filter",
    templateUrl: "ion-filter.html"
})
export class IonFilterComponent implements OnInit {
    filterData: any = FilterData;
    filterOpts: any;
    layout: number = 1;
    openPanel: Boolean = true;
    showBack: Boolean = false;
    activeIndex: number = 0;
    constructor() {
        console.log(this.filterOpts);
    }
    ngOnInit() {
        this.getOpts();
    }
    getOpts() {
        this.filterOpts = this.filterData[this.activeIndex];
        console.log(this.filterOpts.options);
        this.getLayout();
    }
    getLayout(){
        let layout = 1;
        for (let item of this.filterOpts.options) {
            if (item.options && item.options.length>0) {
                layout = 2;
            }
        }
        this.layout = layout;
        console.log(this.layout);
        
    }
}