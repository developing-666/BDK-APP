import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings/settings';

@NgModule({
  declarations: [
    SettingsPage,
  ],
	entryComponents: [
    SettingsPage,
	],
  imports: [
    IonicPageModule.forChild(SettingsPage),
  ],
})
export class SettingsPageModule {}
