import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { RemindPage } from './remind/remind';
import { NewRemindPage } from './new-remind/new-remind';
import { AddRemindPage } from './add-remind/add-remind';
import { AddClienteleRemindPage } from './add-clientele-remind/add-clientele-remind';

import { ComponentsModule } from '../../components/components.module';
@NgModule({
	declarations: [
		RemindPage,
		NewRemindPage,
		AddRemindPage,
		AddClienteleRemindPage
	],
	entryComponents: [
		RemindPage,
		NewRemindPage,
		AddRemindPage,
		AddClienteleRemindPage
	],
	imports: [
		IonicModule,
		ComponentsModule
	]
})
export class RemindModule {
}
