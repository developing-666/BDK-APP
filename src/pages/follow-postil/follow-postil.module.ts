import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowPostilPage } from './follow-postil';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
	declarations: [
		FollowPostilPage,
	],
	imports: [
		ComponentsModule,
		IonicPageModule.forChild(FollowPostilPage),
	],
})
export class FollowPostilPageModule { }
