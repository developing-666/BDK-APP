import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowRecordPage } from './follow-record';


import { PipesModule } from '../../../../../pipes/pipes.module';
@NgModule({
  declarations: [
    FollowRecordPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(FollowRecordPage),
  ],
})
export class FollowRecordPageModule {}
