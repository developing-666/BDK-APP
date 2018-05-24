import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ClientelePage } from './clientele/clientele';
import { SearchClientelePage } from './search-clientele/search-clientele';

@NgModule({
	declarations: [
		ClientelePage,
		SearchClientelePage
	],
	entryComponents: [
		ClientelePage,
		SearchClientelePage
	],
	imports: [
		IonicModule
	]
})
export class ClienteleModule {
}
