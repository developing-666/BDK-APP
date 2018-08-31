import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthSettingPage } from './auth-setting';

@NgModule({
  declarations: [
    AuthSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthSettingPage),
  ],
})
export class AuthSettingPageModule {}
