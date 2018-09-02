import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotFollowPage } from './not-follow';


import { ComponentsModule } from '../../../../../components/components.module';
@NgModule({
  declarations: [
    NotFollowPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(NotFollowPage),
  ],
})
export class NotFollowPageModule {}
