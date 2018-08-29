import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostilPage } from './postil';

@NgModule({
  declarations: [
    PostilPage,
  ],
  imports: [
    IonicPageModule.forChild(PostilPage),
  ],
})
export class PostilPageModule {}
