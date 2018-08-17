import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ManagePage } from './manage/manage';
import { AuthSettingPage } from './auth-setting/auth-setting';


import { ComponentsModule } from '../../components/components.module';


@NgModule({
	declarations: [
		ManagePage,
		AuthSettingPage,
	],
	entryComponents: [
		ManagePage,
		AuthSettingPage,
	],
	imports: [
		IonicModule,
		ComponentsModule,
	]
})
export class ManageModule {
}
