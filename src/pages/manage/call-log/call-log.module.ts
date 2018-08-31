import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CallLogPage } from './call-log';

@NgModule({
  declarations: [
    CallLogPage,
  ],
  imports: [
    IonicPageModule.forChild(CallLogPage),
  ],
})
export class CallLogPageModule {}
