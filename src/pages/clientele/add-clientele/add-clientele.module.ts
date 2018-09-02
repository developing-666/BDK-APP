import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddClientelePage } from './add-clientele';

import { ComponentsModule } from '../../../components/components.module';
@NgModule({
    declarations: [AddClientelePage],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(AddClientelePage)
    ]
})
export class AddClientelePageModule {}
