import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { NavController, Tabs, Events} from 'ionic-angular';

import { RemindPage } from '../remind/remind/remind';
import { ClientelePage } from '../clientele/clientele/clientele';
import { SettingsPage } from '../settings/settings/settings';


import { SearchResultPage } from '../clientele/search-result/search-result';
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild(Tabs) tabRef: Tabs;
    // tab1Root = RemindPage;
    // tab2Root = ClientelePage;
    // tab3Root = SettingsPage;
    tab1Root = ClientelePage;
    tab2Root = RemindPage;
    tab3Root = SettingsPage;
    mb: any;
    constructor(
        public navCtrl: NavController,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private event: Events
    ) {}
    ionViewDidLoad() {
        let tabs = this.queryElement(this.elementRef.nativeElement, '.tabbar');
        this.event.subscribe('hideTabs', () => {
            this.renderer.setElementStyle(tabs, 'display', 'none');
            let SelectTab = this.tabRef.getSelected()._elementRef.nativeElement;
            let content = this.queryElement(SelectTab, '.scroll-content');
            this.mb = content.style['margin-bottom'];
            this.renderer.setElementStyle(content, 'margin-bottom', '0');
        });
        this.event.subscribe('showTabs', () => {
            this.renderer.setElementStyle(tabs, 'display', '');
            let SelectTab = this.tabRef.getSelected()._elementRef.nativeElement;
            let content = this.queryElement(SelectTab, '.scroll-content');
            this.renderer.setElementStyle(content, 'margin-bottom', this.mb);
        });
    }
    queryElement(elem: HTMLElement, q: string): HTMLElement {
        return <HTMLElement>elem.querySelector(q);
    }
}
