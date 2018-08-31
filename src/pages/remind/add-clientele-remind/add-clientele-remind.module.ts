import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddClienteleRemindPage } from './add-clientele-remind';

import { ComponentsModule } from '../../../components/components.module';
@NgModule({
	declarations: [
		AddClienteleRemindPage,
	],
	imports: [
		ComponentsModule,
		IonicPageModule.forChild(AddClienteleRemindPage),
	],
})
export class AddClienteleRemindPageModule { }
