import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { NavController, Tabs, Events,ViewController} from 'ionic-angular';

import { ManagePage } from '../manage/manage/manage';
import { AuthSettingPage } from '../manage/auth-setting/auth-setting';

import { RemindPage } from '../remind/remind/remind';
import { ClientelePage } from '../clientele/clientele/clientele';
import { SettingsPage } from '../settings/settings/settings';

import {JpushNotification}from '../../providers/jpush-notification';

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
    tab0Root = AuthSettingPage;
    tab1Root = RemindPage;
    tab2Root = ClientelePage;
    tab3Root = SettingsPage;
    mb: any;
    constructor(
        public navCtrl: NavController,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private events: Events,
		public viewCtrl: ViewController,
		private jpushNotification:JpushNotification,
    ) {}
    ionViewDidLoad() {
        let tabs = this.queryElement(this.elementRef.nativeElement, '.tabbar');
        this.events.subscribe('hideTabs', () => {
            this.renderer.setElementStyle(tabs, 'display', 'none');
            let SelectTab = this.tabRef.getSelected()._elementRef.nativeElement;
            let content = this.queryElement(SelectTab, '.scroll-content');
            this.mb = content.style['margin-bottom'];
            this.renderer.setElementStyle(content, 'margin-bottom', '0');
        });
        this.events.subscribe('showTabs', () => {
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
