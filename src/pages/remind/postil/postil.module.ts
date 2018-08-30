import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostilPage } from './postil';


import { ComponentsModule } from '../../../components/components.module';

@NgModule({
	declarations: [
		PostilPage,
	],
	imports: [
		ComponentsModule,
		IonicPageModule.forChild(PostilPage),
	],
})
export class PostilPageModule { }
