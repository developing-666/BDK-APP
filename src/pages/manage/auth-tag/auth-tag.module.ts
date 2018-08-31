import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthTagPage } from './auth-tag';

@NgModule({
  declarations: [
    AuthTagPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthTagPage),
  ],
})
export class AuthTagPageModule {}
