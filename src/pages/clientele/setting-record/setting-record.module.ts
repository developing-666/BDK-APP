import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingRecordPage } from './setting-record';


import { ComponentsModule } from '../../../components/components.module';
@NgModule({
  declarations: [
    SettingRecordPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SettingRecordPage),
  ],
})
export class SettingRecordPageModule {}
