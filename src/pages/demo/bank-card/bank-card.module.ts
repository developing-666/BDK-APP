import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankCardPage } from './bank-card';

@NgModule({
  declarations: [
    BankCardPage,
  ],
  imports: [
    IonicPageModule.forChild(BankCardPage),
  ],
})
export class BankCardPageModule {}
