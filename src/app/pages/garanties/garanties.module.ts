import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GarantiesPageRoutingModule } from './garanties-routing.module';

import { GarantiesPage } from './garanties.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GarantiesPageRoutingModule
  ],
  declarations: [GarantiesPage]
})
export class GarantiesPageModule {}
