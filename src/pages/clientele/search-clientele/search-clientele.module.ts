import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchClientelePage } from './search-clientele';

@NgModule({
  declarations: [
    SearchClientelePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchClientelePage),
  ],
})
export class SearchClientelePageModule {}
