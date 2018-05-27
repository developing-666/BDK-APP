import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ClientelePage } from './clientele/clientele';
import { SearchClientelePage } from './search-clientele/search-clientele';
import { AddClientelePage } from './add-clientele/add-clientele';
import { ClienteleTagPage } from './clientele-tag/clientele-tag';
import { CustomTagPage } from './custom-tag/custom-tag';
import { SettingRecordPage } from './setting-record/setting-record';

@NgModule({
	declarations: [
		ClientelePage,
		SearchClientelePage,
		AddClientelePage,
		ClienteleTagPage,
		CustomTagPage,
		SettingRecordPage
	],
	entryComponents: [
		ClientelePage,
		SearchClientelePage,
		AddClientelePage,
		ClienteleTagPage,
		CustomTagPage,
		SettingRecordPage
	],
	imports: [
		IonicModule
	]
})
export class ClienteleModule {
}
