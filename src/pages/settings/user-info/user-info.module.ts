import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserInfoPage } from './user-info';

import { PipesModule } from '../../../pipes/pipes.module';
@NgModule({
	declarations: [
		UserInfoPage,
	],
	imports: [
		PipesModule,
		IonicPageModule.forChild(UserInfoPage),
	],
})
export class UserInfoPageModule { }
