import { ModuleWithProviders, NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AlphaScroll } from './alpha-scroll';

@NgModule({
	imports: [
		IonicModule
	],
	exports: [
		AlphaScroll
	],
	declarations: [
		AlphaScroll
	]
})
export class AlphaScrollModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: AlphaScrollModule, providers: []
		};
	}
}
