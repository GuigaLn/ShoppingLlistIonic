import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrencyPageRoutingModule } from './currency-routing.module';

import { CurrencyPage } from './currency.page';
import { MenuModule } from '../../components/menu/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrencyPageRoutingModule,
    MenuModule
  ],
  declarations: [CurrencyPage]
})
export class CurrencyPageModule {}
