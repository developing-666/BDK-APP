import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ManagePage } from './manage/manage';
import { AuthSettingPage } from './auth-setting/auth-setting';
import { AddAuthPage } from './add-auth/add-auth';
import { AuthTagPage } from './auth-tag/auth-tag';
import { PickPhonePage } from './pick-phone/pick-phone';
import { CallLogPage } from './call-log/call-log';

import { ComponentsModule } from '../../components/components.module';


@NgModule({
	declarations: [
		ManagePage,
		AuthSettingPage,
		AddAuthPage,
		AuthTagPage,
		PickPhonePage,
		CallLogPage,
	],
	entryComponents: [
		ManagePage,
		AuthSettingPage,
		AddAuthPage,
		AuthTagPage,
		PickPhonePage,
		CallLogPage,
	],
	imports: [
		IonicModule,
		ComponentsModule,
	]
})
export class ManageModule {
}
