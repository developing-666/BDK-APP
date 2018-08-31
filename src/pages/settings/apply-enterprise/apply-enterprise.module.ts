import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyEnterprisePage } from './apply-enterprise';

@NgModule({
	declarations: [
		ApplyEnterprisePage,
	],
	imports: [
		IonicPageModule.forChild(ApplyEnterprisePage),
	],
})
export class ApplyEnterprisePageModule { }
