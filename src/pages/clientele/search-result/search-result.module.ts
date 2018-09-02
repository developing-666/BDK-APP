import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchResultPage } from './search-result';


import { ComponentsModule } from '../../../components/components.module';
@NgModule({
  declarations: [
    SearchResultPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SearchResultPage),
  ],
})
export class SearchResultPageModule {}
