import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

import { RemindPage } from '../remind/remind/remind';
import { ClientelePage } from '../clientele/clientele/clientele';
import { SettingsPage } from '../settings/settings/settings';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	tab1Root = RemindPage;
    tab2Root = ClientelePage;
    tab3Root = SettingsPage;
	constructor(
		public navCtrl: NavController
	) { }
}
