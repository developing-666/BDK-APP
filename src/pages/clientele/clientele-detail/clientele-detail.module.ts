import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClienteleDetailPage } from './clientele-detail';


import { ComponentsModule } from '../../../components/components.module';

@NgModule({
    declarations: [ClienteleDetailPage],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(ClienteleDetailPage)
    ]
})
export class ClienteleDetailPageModule {}
