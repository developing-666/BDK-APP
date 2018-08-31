import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickPhonePage } from './pick-phone';

@NgModule({
	declarations: [
		PickPhonePage,
	],
	imports: [
		IonicPageModule.forChild(PickPhonePage),
	],
})
export class PickPhonePageModule { }
