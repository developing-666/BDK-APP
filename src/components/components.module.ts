import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { VoiceBarComponent } from './voice-bar/voice-bar';
import { RemindItemComponent } from './remind-item/remind-item';
import { ClienteleItemComponent } from './clientele-item/clientele-item';
import { SetStateComponent } from './set-state/set-state';

@NgModule({
	declarations: [
		VoiceBarComponent,
		RemindItemComponent,
		ClienteleItemComponent,
		SetStateComponent
	],
	imports: [
		IonicModule
	],
	exports: [
		VoiceBarComponent,
		RemindItemComponent,
		ClienteleItemComponent,
		SetStateComponent
	],
	entryComponents: [
		VoiceBarComponent
	]
})

export class ComponentsModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: ComponentsModule,
			providers: []
		};
	}
}