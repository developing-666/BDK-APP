

import { ModuleWithProviders, NgModule } from '@angular/core';
import { ScrollModule } from './alpha-scroll.module';
import { PipesModule } from '../../pipes/pipes.module';

export * from './alpha-scroll.module';
export * from '../../pipes/pipes.module';

@NgModule({
	imports: [
		ScrollModule.forRoot(),
		PipesModule.forRoot()
	],
	exports: [
    	ScrollModule,
		PipesModule
	]
})
export class AlphaScrollModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: AlphaScrollModule, providers: []
		};
	}
}
