import { NgModule,ModuleWithProviders } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { VoiceBarComponent } from './voice-bar/voice-bar';

@NgModule({
	declarations: [
		VoiceBarComponent
	],
	imports: [
		IonicModule
	],
	exports: [
		VoiceBarComponent
	],
	entryComponents:[
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