import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RemindPostilPage } from './remind-postil';

import { ComponentsModule } from '../../../components/components.module';
@NgModule({
	declarations: [
		RemindPostilPage,
	],
	imports: [
		ComponentsModule,
		IonicPageModule.forChild(RemindPostilPage),
	],
})
export class RemindPostilPageModule { }
