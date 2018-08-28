import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ClientelePage } from './clientele/clientele';
import { SearchClientelePage } from './search-clientele/search-clientele';
import { AddClientelePage } from './add-clientele/add-clientele';
import { ClienteleTagPage } from './clientele-tag/clientele-tag';
import { CustomTagPage } from './custom-tag/custom-tag';
import { SettingRecordPage } from './setting-record/setting-record';
import { ClienteleDetailPage } from './clientele-detail/clientele-detail';
import { SearchResultPage } from './search-result/search-result';

import { OperatingRecordPage } from './clientele-detail/tabs/operating-record/operating-record';
import { CallRecordPage } from './clientele-detail/tabs/call-record/call-record';
import { FollowRecordPage } from './clientele-detail/tabs/follow-record/follow-record';
import { NotFollowPage } from './clientele-detail/tabs/not-follow/not-follow';
import { AllotPage } from './allot/allot';

import { ComponentsModule } from '../../components/components.module';

import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
	declarations: [
		ClientelePage,
		SearchClientelePage,
		AddClientelePage,
		ClienteleTagPage,
		CustomTagPage,
		ClienteleDetailPage,
		SettingRecordPage,
		OperatingRecordPage,
		SearchResultPage,
		CallRecordPage,
		FollowRecordPage,
		NotFollowPage,
		AllotPage
	],
	entryComponents: [
		ClientelePage,
		SearchClientelePage,
		AddClientelePage,
		ClienteleTagPage,
		CustomTagPage,
		ClienteleDetailPage,
		SettingRecordPage,
		OperatingRecordPage,
		SearchResultPage,
		CallRecordPage,
		FollowRecordPage,
		NotFollowPage,
		AllotPage
	],
	imports: [IonicModule, ComponentsModule, PipesModule]
})
export class ClienteleModule { }
