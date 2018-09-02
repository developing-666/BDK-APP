import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CallRecordPage } from './call-record';

import { ComponentsModule } from '../../../../../components/components.module';
import { PipesModule } from '../../../../../pipes/pipes.module';
@NgModule({
  declarations: [
    CallRecordPage,
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    IonicPageModule.forChild(CallRecordPage),
  ],
})
export class CallRecordPageModule {}
