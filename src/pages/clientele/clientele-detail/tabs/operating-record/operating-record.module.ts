import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OperatingRecordPage } from './operating-record';

import { PipesModule } from '../../../../../pipes/pipes.module';
@NgModule({
  declarations: [
    OperatingRecordPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(OperatingRecordPage),
  ],
})
export class OperatingRecordPageModule {}
