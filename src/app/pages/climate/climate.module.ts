import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClimatePageRoutingModule } from './climate-routing.module';

import { ClimatePage } from './climate.page';
import { MenuModule } from '../../components/menu/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClimatePageRoutingModule,
    MenuModule
  ],
  declarations: [ClimatePage]
})
export class ClimatePageModule {}
