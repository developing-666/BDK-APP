import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ClientelePage } from './clientele/clientele';

@NgModule({
	declarations: [
		ClientelePage,
	],
	entryComponents: [
		ClientelePage,
	],
	imports: [
		IonicModule
	]
})
export class ClienteleModule {
}
