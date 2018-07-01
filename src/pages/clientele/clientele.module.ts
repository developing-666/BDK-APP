import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ClientelePage } from './clientele/clientele';
import { SearchClientelePage } from './search-clientele/search-clientele';
import { AddClientelePage } from './add-clientele/add-clientele';
import { ClienteleTagPage } from './clientele-tag/clientele-tag';
import { CustomTagPage } from './custom-tag/custom-tag';
import { SettingRecordPage } from './setting-record/setting-record';
import { ClienteleDetailPage } from './clientele-detail/clientele-detail';
import { SearchResultPage } from './search-result/search-result';

import { OperatingRecordPage } from './clientele-detail/tabs/operating-record/operating-record';

import { ComponentsModule } from '../../components/components.module';

import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
    declarations: [
        ClientelePage,
        SearchClientelePage,
        AddClientelePage,
        ClienteleTagPage,
        CustomTagPage,
        ClienteleDetailPage,
        SettingRecordPage,
        OperatingRecordPage,
        SearchResultPage
    ],
    entryComponents: [
        ClientelePage,
        SearchClientelePage,
        AddClientelePage,
        ClienteleTagPage,
        CustomTagPage,
        ClienteleDetailPage,
        SettingRecordPage,
        OperatingRecordPage,
        SearchResultPage
    ],
    imports: [IonicModule, ComponentsModule, PipesModule]
})
export class ClienteleModule {}
