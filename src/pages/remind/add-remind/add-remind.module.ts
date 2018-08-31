import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRemindPage } from './add-remind';

import { ComponentsModule } from '../../../components/components.module';
@NgModule({
	declarations: [
		AddRemindPage,
	],
	imports: [
		ComponentsModule,
		IonicPageModule.forChild(AddRemindPage),
	],
})
export class AddRemindPageModule { }
