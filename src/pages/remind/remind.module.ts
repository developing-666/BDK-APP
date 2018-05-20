import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { RemindPage } from './remind/remind';
import { NewRemindPage } from './new-remind/new-remind';
import { AddRemindPage } from './add-remind/add-remind';

@NgModule({
	declarations: [
		RemindPage,
		NewRemindPage,
		AddRemindPage
	],
	entryComponents: [
		RemindPage,
		NewRemindPage,
		AddRemindPage
	],
	imports: [
		IonicModule
	]
})
export class RemindModule {
}
