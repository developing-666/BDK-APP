import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings/settings';
import { UserInfoPage } from './user-info/user-info';
import { ApplyEnterprisePage } from './apply-enterprise/apply-enterprise';
import { HelpPage } from './help/help';
import { HowToApplyPage } from './how-to-apply/how-to-apply';
import { AboutUsPage } from './about-us/about-us';
import { SettingPage } from './setting/setting';
import { ChangePasswordPage } from './change-password/change-password';
import { PushMessagePage } from './push-message/push-message';

@NgModule({
    declarations: [
        SettingsPage,
        UserInfoPage,
        ApplyEnterprisePage,
        HelpPage,
        HowToApplyPage,
        AboutUsPage,
        SettingPage,
        ChangePasswordPage,
        PushMessagePage,
    ],
    entryComponents: [
        SettingsPage,
        UserInfoPage,
        ApplyEnterprisePage,
        HelpPage,
        HowToApplyPage,
        AboutUsPage,
        SettingPage,
        ChangePasswordPage,
        PushMessagePage,
    ],
    imports: [IonicPageModule.forChild(SettingsPage)]
})
export class SettingsPageModule {}
