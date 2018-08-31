import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAuthPage } from './add-auth';

@NgModule({
	declarations: [
		AddAuthPage,
	],
	imports: [
		IonicPageModule.forChild(AddAuthPage),
	],
})
export class AddAuthPageModule { }
