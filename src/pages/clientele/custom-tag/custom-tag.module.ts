import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomTagPage } from './custom-tag';

@NgModule({
  declarations: [
    CustomTagPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomTagPage),
  ],
})
export class CustomTagPageModule {}
