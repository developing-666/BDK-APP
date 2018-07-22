import { NgModule, ModuleWithProviders } from '@angular/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { VoiceBarComponent } from './voice-bar/voice-bar';
import { RemindItemComponent } from './remind-item/remind-item';
import { ClienteleItemComponent } from './clientele-item/clientele-item';
import { SetStateComponent } from './set-state/set-state';
import { IonFilterComponent } from './ion-filter/ion-filter';
import { IonInputPanelComponent } from './ion-input-panel/ion-input-panel';
import { InfoInputComponent } from './info-input/info-input';
import { IonAudioComponent } from './ion-audio/ion-audio';
import { PhoneNumberInputComponent } from './phone-number-input/phone-number-input';

import { PipesModule } from '../pipes/pipes.module';
import { AppApi } from '../providers/app-api';

// import * as ionicGalleryModal from '../modules/ion-gallery/index';

@NgModule({
    declarations: [
        VoiceBarComponent,
        RemindItemComponent,
        ClienteleItemComponent,
        SetStateComponent,
        IonFilterComponent,
        IonInputPanelComponent,
        InfoInputComponent,
        IonAudioComponent,
        PhoneNumberInputComponent
    ],
    imports: [
        IonicModule,
        PipesModule,
        // ionicGalleryModal.GalleryModalModule
    ],
    exports: [
        VoiceBarComponent,
        RemindItemComponent,
        ClienteleItemComponent,
        SetStateComponent,
        IonFilterComponent,
        IonInputPanelComponent,
        InfoInputComponent,
        IonAudioComponent,
        PhoneNumberInputComponent
    ],
    entryComponents: [],
    providers: [
        // {
        //     provide: HAMMER_GESTURE_CONFIG,
        //     useClass: ionicGalleryModal.GalleryModalHammerConfig
        // },
        AppApi
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
