import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PushMessagePage } from './push-message';

@NgModule({
	declarations: [
		PushMessagePage,
	],
	imports: [
		IonicPageModule.forChild(PushMessagePage),
	],
})
export class PushMessagePageModule { }
