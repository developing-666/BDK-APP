import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings/settings';
import { UserInfoPage } from './user-info/user-info';

@NgModule({
  declarations: [
    SettingsPage,
    UserInfoPage,
  ],
	entryComponents: [
    SettingsPage,
    UserInfoPage,
	],
  imports: [
    IonicPageModule.forChild(SettingsPage),
  ],
})
export class SettingsPageModule {}
