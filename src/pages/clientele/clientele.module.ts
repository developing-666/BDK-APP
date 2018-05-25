import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ClientelePage } from './clientele/clientele';
import { SearchClientelePage } from './search-clientele/search-clientele';
import { AddClientelePage } from './add-clientele/add-clientele';

@NgModule({
	declarations: [
		ClientelePage,
		SearchClientelePage,
		AddClientelePage
	],
	entryComponents: [
		ClientelePage,
		SearchClientelePage,
		AddClientelePage
	],
	imports: [
		IonicModule
	]
})
export class ClienteleModule {
}
