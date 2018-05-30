import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { VoiceBarComponent } from './voice-bar/voice-bar';
import { RemindItemComponent } from './remind-item/remind-item';
import { ClienteleItemComponent } from './clientele-item/clientele-item';
import { SetStateComponent } from './set-state/set-state';
import { IonFilterComponent } from './ion-filter/ion-filter';

@NgModule({
	declarations: [
		VoiceBarComponent,
		RemindItemComponent,
		ClienteleItemComponent,
		SetStateComponent,
		IonFilterComponent
	],
	imports: [
		IonicModule
	],
	exports: [
		VoiceBarComponent,
		RemindItemComponent,
		ClienteleItemComponent,
		SetStateComponent,
		IonFilterComponent
	],
	entryComponents: []
})

export class ComponentsModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: ComponentsModule,
			providers: []
		};
	}
}