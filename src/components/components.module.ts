import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { VoiceBarComponent } from './voice-bar/voice-bar';
import { RemindItemComponent } from './remind-item/remind-item';
import { ClienteleItemComponent } from './clientele-item/clientele-item';
import { SetStateComponent } from './set-state/set-state';
import { IonFilterComponent } from './ion-filter/ion-filter';
import { IonInputPanelComponent } from './ion-input-panel/ion-input-panel';
import { InfoInputComponent } from './info-input/info-input';
import { IonAudioComponent } from './ion-audio/ion-audio';

@NgModule({
	declarations: [
		VoiceBarComponent,
		RemindItemComponent,
		ClienteleItemComponent,
		SetStateComponent,
		IonFilterComponent,
		IonInputPanelComponent,
		InfoInputComponent,
		IonAudioComponent
	],
	imports: [IonicModule],
	exports: [
		VoiceBarComponent,
		RemindItemComponent,
		ClienteleItemComponent,
		SetStateComponent,
		IonFilterComponent,
		IonInputPanelComponent,
		InfoInputComponent,
		IonAudioComponent
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
