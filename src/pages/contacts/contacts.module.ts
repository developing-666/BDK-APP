import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ContactsPage}from './contacts'

import { ComponentsModule } from '../../components/components.module';

@NgModule({
	declarations: [
		ContactsPage,
	],
	imports: [
		ComponentsModule,
		IonicPageModule.forChild(ContactsPage),
	],
})
export class ContactsPageModule { }
