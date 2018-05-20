import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { RemindPage } from './remind/remind';
import { NewRemindPage } from './new-remind/new-remind';

@NgModule({
	declarations: [
		RemindPage,
		NewRemindPage
	],
	entryComponents: [
		RemindPage,
		NewRemindPage
	],
	imports: [
		IonicModule
	]
})
export class RemindModule {
}
