import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewRemindPage } from './new-remind';

@NgModule({
  declarations: [
    NewRemindPage,
  ],
  imports: [
    IonicPageModule.forChild(NewRemindPage),
  ],
})
export class NewRemindPageModule {}
